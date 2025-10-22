import Teammate from "../../models/teammate/teammateModel.js";

// Create teammate
export const createTeammate = async (req, res) => {
  try {
    const { name, email, role, department, phone, joiningDate, skills, photo, addedBy } = req.body;
    const teammate = new Teammate({
      name, email, role, department, phone,
      joiningDate, skills: skills?.split(",").map(s => s.trim()), photo, addedBy
    });
    const saved = await teammate.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Get all teammates
export const getTeammates = async (req, res) => {
  try {
    const teammates = await Teammate.find().sort({ createdAt: -1 });
    res.status(200).json(teammates);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update teammate
export const updateTeammate = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.skills) data.skills = data.skills.split(",").map(s => s.trim());
    const updated = await Teammate.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!updated) return res.status(404).json({ message: "Teammate not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete teammate
export const deleteTeammate = async (req, res) => {
  try {
    const deleted = await Teammate.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Teammate not found" });
    res.status(200).json({ message: "Teammate deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
