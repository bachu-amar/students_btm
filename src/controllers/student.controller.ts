import User from "@/models/student.models";
import Payment from "@/models/payment.model";
import mongoose from "mongoose";

// const mongoose = require("mongoose");
let date_ob = new Date();
let Numbers = [];
// let a = 1
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

let id = "BTM_" + year + month + date + "00";

async function getNextSequenceValue(documentType) {
  const sequence = await User.findByIdAndUpdate(
    documentType,
    { $inc: { nextId: 1 } },
    { new: true, upsert: true }
  );

  return sequence.nextId;
}

export const sub = async (req, res) => {
  const {
    training_center,
    medium,
    firstName,
    lastName,
    gender,
    blood_group,
    DOB,
    soOrdo,
    email,
    address,
    nationality,
    education,
    church_membership,
    paster_name,
    mobile,
    alt_number,
    educational_qualification,
    occupation,
  } = req.body;
  const image = req.files["image"][0];
  const sign = req.files["sign"][0];
  const ssc = req.files["ssc"][0];
  const aadhar = req.files["aadhar"][0];

  try {
    const userId = await getNextSequenceValue("Student");
    // Create a new user instance with the data
    const user = new User({
      _id: id + userId,
      training_center,
      medium,
      firstName,
      lastName,
      gender,
      blood_group,
      DOB,
      soOrdo,
      aadhar: {
        data: aadhar.buffer, // Store the binary data of the image
        contentType: aadhar.mimetype, // Store the content type (e.g., 'image/jpeg')
      },
      email,
      address,
      nationality,
      education,
      church_membership,
      paster_name,
      mobile,
      alt_number,
      educational_qualification,
      occupation,
      ssc: {
        data: ssc.buffer, // Store the binary data of the image
        contentType: ssc.mimetype, // Store the content type (e.g., 'image/jpeg')
      },

      image: {
        data: image.buffer, // Store the binary data of the image
        contentType: image.mimetype, // Store the content type (e.g., 'image/jpeg')
      },
      sign: {
        data: sign.buffer, // Store the binary data of the image
        contentType: sign.mimetype, // Store the content type (e.g., 'image/jpeg')
      },
    });

    // Save the user to the database
    await user.save();

    res.status(200).json(user._id);
  } catch (error) {
    res.status(500).send("Error uploading user data or image.");
  }
};

export const payments = async (req, res) => {
  const image = req.files["image"][0];
  const { mobile } = req.body;
  try {
    const user = new Payment({
      image: {
        data: image.buffer, // Store the binary data of the image
        contentType: image.mimetype, // Store the content type (e.g., 'image/jpeg')
      },
      mobile,
    });
    await user.save();

    res.status(200).json("Files uploaded successfully");
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "An error occurred while fetching." });
  }
};





export const images =  async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Send the image data as a response
    res.set('Content-Type', payment.image.contentType);
    res.send(payment.image.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the image' });
  }
};



export const use_images =  async (req, res) => {
    
    try {
        const id = req.params.id;
        const user = await User.findById(id); // Fetch all users and select only the 'image' field

        if (!user) {
            return res.status(404).json({ error: 'No user found' });
          }
      
         
          const image = {
            contentType: user.image.contentType,
            data: user.image.data,
            
          };
          const ssc = {
            contentType: user.ssc.contentType,
            data: user.ssc.data,
          };
          const aadhar = {
            contentType: user.aadhar.contentType,
            data: user.aadhar.data,
          };
          const sign = {
            contentType: user.sign.contentType,
            data: user.sign.data,
          };
          const images_result={image:image,
            ssc:ssc,
            aadhar:aadhar,
            sign:sign,
            user}
          console.log(images_result)
        //   res.set('Content-Type', user.ssc.contentType, user.aadhar.contentType, user.image.contentType, user.sign.contentType);
        //   res.send(user.ssc.data, user.aadhar.data, user.sign.data, user.image.data);
        res.status(200).json(images_result)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the image' });
    }
  };
