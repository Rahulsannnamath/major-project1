const User = require("../models/user");

module.exports.signupForm = (req,res)=>{
    res.render("users/signup");

}

module.exports.postsignUpForm = async (req,res)=>{
    let {username , password } = req.body;
    let em = req.body.email;
    let newUser = new User({
        email:em,
        username:username
    });
    await User.register(newUser,password);
    req.login(newUser,(err)=>{
        if(err){
            next(err);
        }
        else{
            console.log("user has been signed up");
            req.flash("signup","you have registered!");
            res.redirect("/listings");
        }
    })
    
}

module.exports.loginForm = (req,res)=>{
    res.render("users/login");
}

module.exports.postLoginForm = async (req,res)=>{
    if(res.locals.redirect){
    req.flash("success","logged in!");
    res.redirect(res.locals.redirect);
    }
    
    else{
        req.flash("success","logged in!");
        res.redirect("/listings"); 
    }
}

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
           return  next(err);
        }
    });
    res.redirect("/listings");
}

