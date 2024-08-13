import express from 'express';
import { pool } from './db.js';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

const salt = bcrypt.genSaltSync(parseInt(process.env.saltRound));

//Route to create an user
router.post('/signup',async(request,response)=>{
    try {

        if (!request.body.username ||
            !request.body.password ||
            !request.body.email){
                return response.json({message:"Please enter all fields",validated:false});
            }

        //Verify email
        const email = request.body.email;
        const replicaMail = await pool.query('SELECT * FROM person WHERE email=$1',[email]);
        if (replicaMail.rows.length!=0){
            return response.json({message:"Enter a unique email",validated:false});
        }

        //Verify username
        const username = request.body.username;
        const replicaUsername = await pool.query('SELECT * FROM person WHERE username=$1',[username]);
        if (replicaUsername.rows.length!=0){
            return response.json({message:"Enter a unique username",validated:false});
        }

        const password = request.body.password;

        //Hash password
        
        const hash = bcrypt.hashSync(password,salt);

        //Create the user in db
        const newUser = await pool.query('INSERT INTO person (email,username,password) VALUES($1,$2,$3) RETURNING *',[email,username,hash]);

        return response.status(200).json({message:"Created New User!",newUser:newUser.rows,validated:true});

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route to upload a proof
router.post('/upload/:person/:challenge',async(request,response)=>{
    try {
        const binary = request.body.binary;
        const person = request.params.person;
        const challenge = request.params.challenge;

        //Upload the binary into the proof database
        const newProof = await pool.query('INSERT INTO proof(challenge_id,person_id,proof_image) VALUES($1,$2,$3) RETURNING *',[challenge,person,binary]);

        //Check if the progress exists already
        const progress = await pool.query('SELECT * FROM progress WHERE challenge_id=$1 AND person_id=$2',[challenge,person]);
        //Create new progress if didn't exist
        if (progress.rows.length==0)
        {
            const createProgress = await pool.query('INSERT INTO progress(challenge_id,person_id,task_progress) VALUES($1,$2,$3) RETURNING *',[challenge,person,1]);
        }
        else{
            const currentProgress = progress.rows[0].task_progress;
            const maxProgress = await pool.query('SELECT * FROM challenge WHERE id=$1',[challenge]);
            //Check if user has reached the max progress
            if ((parseInt(currentProgress)+1)>=(parseInt(maxProgress.rows[0].max_progress))){
                //Reset progress to 0
                const resetProgress = await pool.query('UPDATE progress SET task_progress=DEFAULT WHERE challenge_id=$1 AND person_id=$2',[challenge,person]);
                //Check user's trophies
                const userTrophies = await pool.query('SELECT * FROM trophies WHERE person_id=$1',[person]);
                //Add trophie if user doesn't have one
                if (parseInt(userTrophies.rows.length)==0){
                    const addTrophie = await pool.query('INSERT INTO trophies(person_id,amount) VALUES($1,$2)',[person,1]);
                }
                //Increment user trophie otherwise
                else{
                    const incrementTrophie = await pool.query('UPDATE trophies SET amount=$1 WHERE person_id=$2',[(parseInt(userTrophies.rows[0].amount)+1),person]);
                }
                return response.status(200).json({message:"Uploaded Proof"});
            }
            //Increment progress otherwise
            const incrementProgress = await pool.query('UPDATE progress SET task_progress=$1 WHERE person_id=$2 AND challenge_id=$3',[(parseInt(progress.rows[0].task_progress)+1),person,challenge]);
        }

        return response.status(200).json({message:"Uploaded Proof"});

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route to login
router.post('/login',async(request,response)=>{
    try {
        if (!request.body.username ||
            !request.body.password){
                return response.json({message:"Please enter all fields",validated:false});
            }
        
        const username=request.body.username;
        const password = request.body.password;

        const storedUsername = await pool.query('SELECT * FROM person WHERE username=$1',[username]);
        if (storedUsername.rows.length==0){
            return response.json({message:"Enter a valid username",validated:false});
        }
        //Get the hashed password
        const retrievedPassword = storedUsername.rows[0].password;
        //Verify password:
        const verifyPassword = await bcrypt.compare(password,retrievedPassword);

        //If incorrect password
        if (!verifyPassword){
            return response.json({message:"Invalid Password",validated:false});
        }
        return response.status(200).json({message:"Logged In!",validated:true,user:storedUsername.rows[0]});
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route to checkout
router.post('/checkout/:person/:product',async(request,response)=>{
    try {
        const person = request.params.person;
        const product = request.params.product;

        const quantity = parseInt(request.body.quantity);

        const trophiesInfo = await pool.query('SELECT * FROM trophies WHERE person_id=$1',[person]);
        if (trophiesInfo.rows.length==0){
            return response.json({message:"User does not have enought tickets!"});
        }
        const personTickets = (trophiesInfo.rows[0].amount);

        const productInfo = await pool.query('SELECT * FROM products WHERE id=$1',[product]);
        if (productInfo.rows.length==0){
            return response.json({message:"Product does not exist!"});
        }
        const price = (productInfo.rows[0].price);

        //check if user can buy the product
        if ((quantity*price)>(personTickets)){
            return response.json({message:`User does not have enough tickets`});
        }

        const remainingTickets = personTickets - (price*quantity);

        //Reduce the user's trophies
        const updatedTickets = await pool.query('UPDATE trophies SET amount=$1 WHERE person_id=$2',[remainingTickets,person]);

        return response.status(200).json({message:"Checked out item!"});
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route to get all challenges
router.get('/challenge',async(request,response)=>{
    try {
        const challenges = await pool.query('SELECT * FROM challenge');

        return response.json({message:"Got all challenges!",challenges:challenges.rows});
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route to get the leaderboard
router.get('/leaderboard',async(request,response)=>{
    try {
        const leaderboard = await pool.query('SELECT * FROM trophies ORDER BY amount DESC LIMIT 10');
        return response.json({message:"Got leaderboard",leaderboard:leaderboard.rows})
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route to get the products
router.get('/products',async(request,response)=>{
    try {
        const products = await pool.query('SELECT * FROM products');
        return response.json({message:"Got products",products:products.rows});
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route to get the progress of a challenge for a user
router.get('/progress/:person/:challenge',async(request,response)=>{
    try {
        const person = request.params.person;
        const challenge = request.params.challenge;


        const progress = await pool.query('SELECT * FROM progress WHERE challenge_id=$1 AND person_id=$2',[challenge,person]);

        console.log(progress.rows);

        return response.json({message:"Got progress!",progress:progress.rows});
    } catch (error) {
        
        console.log(error.message);
        return response.status(500).send({ message: error.message,progress:progress.rows});
    }
});

//Route to get the details of a person
router.get('/details/:person',async(request,response)=>{
    try {
        const person = request.params.person;
        const personDetails = await pool.query('SELECT * FROM person WHERE id=$1',[person]);

        if ((!personDetails)||(personDetails.rows.length==0)){
            return response.json({message:"User does not exist"});
        }

        return response.status(200).send({message:"Got user details",personDetails:personDetails.rows[0]});
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route to get the tickets/trophies of a user
router.get('/tickets/:person',async(request,response)=>{
    try {
        const userId = request.params.person;
        const userTickets = await pool.query('SELECT * FROM trophies WHERE person_id=$1',[userId]);

        if ((!userTickets)||(userTickets.rows.length==0)){
            return response.json({message:"User does not have any tickets",userTickets:0});
        }

        return response.status(200).json({message:"Found number of tickets",userTickets:userTickets.rows[0].amount});
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;