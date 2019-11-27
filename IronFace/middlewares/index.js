exports.whichRole = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (
      req.user.role === "Student" || 
      req.user.role === "IronBuddy"  
    
    ) {
      req.app.locals.isMortal = true;
      req.app.locals.isNo = false;
    } 
    else if (
      req.user.role === "TeacherAssistant"||
      req.user.role === "LeadTeacher"
      
      ) {
        req.app.locals.isTeacher = true;
        req.app.locals.isNo = false;
      } 
      else if (
        req.user.role === "Staff"
        
        ) {
          req.app.locals.isGod = true;
          req.app.locals.isNo = false;
        } 
        
        
        else if (
          req.user.role === ""
          
          ) {
            req.app.locals.isNo = true;
          } 
         


    
    else {
      req.app.locals.isMortal = false;
      req.app.locals.isTeacher = false;
      req.app.locals.isGod = false;
      req.app.locals.isNo = true;

    }
  } else {
    req.app.locals.isMortal = false;
    req.app.locals.isTeacher = false;
    req.app.locals.isGod = false;
    req.app.locals.isNo = true;

  }
  next();
};

exports.isAuth = (req, res, next) =>
  req.isAuthenticated() ? next() : res.redirect("/");

exports.canLogin = (req, res, next) =>
  !req.isAuthenticated()
    ? next()
    : res.redirect(`/${req.user.role.toLowerCase()}/profile`);
