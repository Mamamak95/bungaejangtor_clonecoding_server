import nodemailer from 'nodemailer';
import * as repository from "../repository/signupRepository.js"
import bcript from "bcryptjs"

const  mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nodetest789@gmail.com",
    pass: "ygia zkmz umvc tepq"
  }
})

export async function emailCheck(req, res){
  const {eid, domain} = req.body;
  const id = eid +domain;
  const number = Math.floor(Math.random()*100000)
  console.log(id);

  const mailOptions = {
    from : "nodetest789@gmail.com",
    to: id,
    subject: 'Nodemailer Test',
    text: `확인값 ${number}`
  };

  mailer.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return;
    } else {
      console.log('Email Sent : ', info);
    }
  })

  res.json(number);
}

export async function signup(req, res){
  const {eid, domain, pass, nickname} = req.body;
  const id = eid + domain;
  const hpass = bcript.hashSync(pass, 10)
  const params = [id, hpass, nickname];
  const result = await repository.signup(params);
  res.json(result);
}