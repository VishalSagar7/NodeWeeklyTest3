const express = require('express');
const app = express();


app.use(express.json());


function validateUserData(req, res, next) {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    
    const isNameValid = (name) => /^[A-Z][a-z]*$/.test(name);
    if (!isNameValid(firstName)) {
        return res.status(400).json({ error: "First name must start with a capital letter." });
    }
    if (!isNameValid(lastName)) {
        return res.status(400).json({ error: "Last name must start with a capital letter." });
    }

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: "Invalid email address. Must contain '@' symbol." });
    }

    
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error: "Password must contain at least one uppercase letter, one numeric character, one special character, and be at least 8 characters long.",
        });
    }

    
    const isPhoneValid = /^\d{10,}$/.test(phoneNumber);
    if (!isPhoneValid) {
        return res.status(400).json({ error: "Phone number must be at least 10 digits long." });
    }

    
    next();
}


app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message || "Internal Server Error" });
});


app.post('/register', validateUserData, (req, res) => {
    res.status(200).json({ message: "User registered successfully!", data: req.body });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
