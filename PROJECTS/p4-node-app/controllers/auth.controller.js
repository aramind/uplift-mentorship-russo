import { registerUser, signInUser } from '../services/auth.service.js';


const showMe = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  })
}

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { token } = await registerUser(name, email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    const responseObj = {
      success: true, 
      message: 'Registered successfully!',
    }

    res.status(201).json(responseObj);
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await signInUser(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    const responseObj = {
      success: true,
      message: 'Signed in successfully!',
      user: user,
    };

    return res.status(200).json(responseObj);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}

const signOut = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  
  res.status(200).json({ 
    success: true, 
    message: 'Signed out successfully!' 
  });
}


export {
  showMe,
  register,
  signIn,
  signOut
};