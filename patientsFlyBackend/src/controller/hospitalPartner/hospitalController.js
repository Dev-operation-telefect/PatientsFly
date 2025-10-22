import Hospital from "../../models/hospitalPartner/HospitalModel.js";
import cloudinary from "../../config/cloudinary.js";

// Helper: upload buffer to Cloudinary (returns { url, publicId })
async function uploadBufferToCloudinary(buffer, folder = "hospitals") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => {
        if (err) return reject(err);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
}

export const createHospital = async (req, res) => {
  try {
    const data = req.body;

    // specialties may come as CSV string from form
    if (typeof data.specialties === "string") {
      data.specialties = data.specialties
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    let image;
    if (req.file && req.file.buffer) {
      image = await uploadBufferToCloudinary(req.file.buffer);
    }

    const hospital = await Hospital.create({ ...data, image });
    res.status(201).json({ success: true, hospital });
  } catch (error) {
    console.error("Create hospital error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().sort({ createdAt: -1 });
    res.json({ success: true, hospitals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, hospital });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Partial update with dot-notation + optional image replacement
export const updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ success: false, message: "Not found" });

    const body = req.body;
    const updateData = {};

    // convert comma-separated specialties if string
    if (typeof body.specialties === "string") {
      body.specialties = body.specialties
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // dot-notation for partial nested updates
    for (const key in body) {
      if (
        body[key] &&
        typeof body[key] === "object" &&
        !Array.isArray(body[key])
      ) {
        for (const subKey in body[key]) {
          updateData[`${key}.${subKey}`] = body[key][subKey];
        }
      } else {
        updateData[key] = body[key];
      }
    }

    // If a new image file is provided, upload and schedule old one for delete
    if (req.file && req.file.buffer) {
      const uploaded = await uploadBufferToCloudinary(req.file.buffer);
      updateData["image"] = uploaded;

      // remove previous image if exists
      if (hospital.image?.publicId) {
        try {
          await cloudinary.uploader.destroy(hospital.image.publicId);
        } catch (e) {
          console.warn("Cloudinary delete previous image failed:", e?.message);
        }
      }
    }

    const updated = await Hospital.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({ success: true, hospital: updated });
  } catch (error) {
    console.error("Update hospital error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) return res.status(404).json({ success: false, message: "Not found" });

    // cleanup cloudinary
    if (hospital.image?.publicId) {
      try {
        await cloudinary.uploader.destroy(hospital.image.publicId);
      } catch (e) {
        console.warn("Cloudinary delete on remove failed:", e?.message);
      }
    }

    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
