const WTC_API = {
  WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbycC3eXM_-NpXYzQ1Vg3MDSvRMUcos5mYBlW62X07fiVc6Gpa4UY7An0e2Shp1f-PCVvQ/exec', // Paste Google Apps Script Web App URL here after deployment.
  async call(action, payload={}){
    if(!this.WEB_APP_URL){
      console.warn('API URL missing. Using local fallback where available.', action, payload);
      return {ok:false, offline:true, message:'API URL not configured'};
    }
    try{
      const res = await fetch(this.WEB_APP_URL, { method:'POST', mode:'cors', headers:{'Content-Type':'text/plain;charset=utf-8'}, body: JSON.stringify({action, ...payload}) });
      return await res.json();
    }catch(err){ return {ok:false, message: err.message || 'Network error'}; }
  }
};
