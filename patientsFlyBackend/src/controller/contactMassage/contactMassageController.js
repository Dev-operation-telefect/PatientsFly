import Contact from "../../models/contactMassage/contactMassage.js";

// Create contact submission
export const createContact = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    if (!fullName || !email || !message)
      return res.status(400).json({ msg: "All fields are required." });

    const newContact = new Contact({ fullName, email, message });
    await newContact.save();
    res.status(201).json({ msg: "Message sent successfully", contact: newContact });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete a contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Message not found" });
    res.status(200).json({ msg: "Message deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
