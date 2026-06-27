(function(){
  function icon(type){return type==='success'?'✅':type==='error'?'❌':type==='warning'?'⚠️':'ℹ️'}
  window.showNotification=function(type,title,text){
    let container=document.getElementById('toastContainer');
    if(!container){container=document.createElement('div');container.id='toastContainer';container.className='toast-container';document.body.appendChild(container)}
    while(container.children.length>=4){container.firstElementChild.remove()}
    const toast=document.createElement('div');
    const safeType=['success','error','info','warning'].includes(type)?type:'info';
    toast.className='toast '+safeType; toast.setAttribute('role','status'); toast.setAttribute('aria-live','polite');
    toast.innerHTML=`<div style="font-size:20px;line-height:1">${icon(safeType)}</div><div><strong>${title||'Message'}</strong><p>${text||''}</p></div><button aria-label="Close">×</button>`;
    toast.querySelector('button').onclick=()=>closeToast(toast);
    container.appendChild(toast); requestAnimationFrame(()=>toast.classList.add('show'));
    setTimeout(()=>closeToast(toast),4000);
    return toast;
  };
  function closeToast(el){ if(!el||!el.parentNode)return; el.classList.remove('show'); setTimeout(()=>el.remove(),260); }
})();
