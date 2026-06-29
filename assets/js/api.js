const WTC_API = {
  WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbyFYi12K1HygIei4EiQuU6ndfnskAqtDJ4676ANQGQ5dR8rkW8B5ZdBU-wW659PFnXrZw/exec', // Paste Google Apps Script Web App URL here after deployment.
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
