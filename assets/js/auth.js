const Auth = {
  sessionKey:'wtc_student_session_v22', adminKey:'wtc_admin_session_v22',
  getStudent(){ try{return JSON.parse(localStorage.getItem(this.sessionKey)||'null')}catch{return null} },
  getAdmin(){ try{return JSON.parse(localStorage.getItem(this.adminKey)||'null')}catch{return null} },
  setStudent(u){ localStorage.setItem(this.sessionKey, JSON.stringify(u)); },
  setAdmin(a){ localStorage.setItem(this.adminKey, JSON.stringify(a)); },
  clearStudent(){ localStorage.removeItem(this.sessionKey); },
  clearAdmin(){ localStorage.removeItem(this.adminKey); },
  localUsers(){ return JSON.parse(localStorage.getItem('wtc_local_users')||'{}'); },
  saveLocalUser(u){ const all=this.localUsers(); all[u.phone]=u; localStorage.setItem('wtc_local_users', JSON.stringify(all)); },
  async register(profile){
    const api=await WTC_API.call('registerStudent', profile);
    if(api.ok) return api;
    const id='STU'+Date.now(); const user={...profile, studentId:id, active:true}; this.saveLocalUser(user); return {ok:true, student:user, offline:true, message:'Saved locally. Connect API for Google Sheet.'};
  },
  async login(phone,password){
    const api=await WTC_API.call('studentLogin', {phone,password});
    if(api.ok){ this.setStudent(api.student); return api; }
    const u=this.localUsers()[phone];
    if(u && u.password===password && u.active!==false){ this.setStudent(u); return {ok:true, student:u, offline:true}; }
    return {ok:false, message:api.message || 'Invalid phone or password'};
  },
  async adminLogin(phone,password){
    const api=await WTC_API.call('adminLogin', {phone,password});
    if(api.ok){ this.setAdmin(api.admin); return api; }
    if(phone==='9537036383' && password==='wtc@12345'){ const admin={phone,name:'Admin',role:'OWNER',token:'LOCAL_ADMIN'}; this.setAdmin(admin); return {ok:true, admin, offline:true, message:'Local admin login. Change default password in Google Sheet.'}; }
    return {ok:false, message:api.message || 'Invalid admin credentials'};
  }
};
