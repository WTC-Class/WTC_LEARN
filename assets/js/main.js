let activeBrowsingMode='all';
let currentUser=null;
const $=id=>document.getElementById(id);
document.addEventListener('DOMContentLoaded',()=>{
  bootDropdowns(); renderAuthArea(); bindEvents();
  showNotification('info','Welcome to WTC Learn','Select class, board, medium and subject to start learning.');
});
function bindEvents(){
  $('classSelect').addEventListener('change',()=>{ showNotification('info','Class selected', $('classSelect').value?`Now select Board for Class ${$('classSelect').value}`:'Select your class.'); onClassChange(); });
  $('boardSelect').addEventListener('change',()=>{ showNotification('info','Board selected', $('boardSelect').value?'Now select medium.':'Select board.'); onBoardChange(); });
  $('mediumSelect').addEventListener('change',()=>{ showNotification('info','Medium selected', $('mediumSelect').value?'Now select subject.':'Select medium.'); onMediumChange(); });
  $('subjectSelect').addEventListener('change',()=>{ showNotification('success','Subject selected', $('subjectSelect').value?'Available chapters are loading.':'Select subject.'); renderChapters(); });
  $('btnResetFilters').onclick=resetFilters;
$('btnBrowseAll').onclick=browseAll;
const btnMyProfile = $('btnMyProfile');
if(btnMyProfile) btnMyProfile.onclick = snapToPersonalization;
  $('formLogin').onsubmit=loginStudent; $('formSignup').onsubmit=registerStudent;
}
function bootDropdowns(){
  $('classSelect').innerHTML='<option value="">-- Select Class --</option>'+classOptions.map(c=>`<option value="${c}">Class ${c}</option>`).join('');
  $('boardSelect').innerHTML='<option value="">-- Select Board --</option>'+boardOptions.map(b=>`<option value="${b}">${b}</option>`).join('');
}
function onClassChange(){ $('boardSelect').disabled=!$('classSelect').value; $('mediumSelect').disabled=true; $('subjectSelect').disabled=true; $('mediumSelect').innerHTML='<option value="">-- Select Medium --</option>'; $('subjectSelect').innerHTML='<option value="">-- Select Subject --</option>'; tearDown(); $('btnResetFilters').classList.remove('hidden'); }
function onBoardChange(){ const b=$('boardSelect').value; $('mediumSelect').innerHTML='<option value="">-- Select Medium --</option>'; (mediumOptions[b]||[]).forEach(m=>$('mediumSelect').innerHTML+=`<option value="${m}">${m}</option>`); $('mediumSelect').disabled=!b; $('subjectSelect').disabled=true; $('subjectSelect').innerHTML='<option value="">-- Select Subject --</option>'; tearDown(); }
function onMediumChange(){ const b=$('boardSelect').value; $('subjectSelect').innerHTML='<option value="">-- Select Subject --</option>'; (subjectsMapping[b]||[]).forEach(s=>$('subjectSelect').innerHTML+=`<option value="${s}">${s}</option>`); $('subjectSelect').disabled=!$('mediumSelect').value; tearDown(); }
function resetFilters(){ ['classSelect','boardSelect','mediumSelect','subjectSelect'].forEach(id=>$(id).value=''); $('boardSelect').disabled=true; $('mediumSelect').disabled=true; $('subjectSelect').disabled=true; $('mediumSelect').innerHTML='<option value="">-- Select Medium --</option>'; $('subjectSelect').innerHTML='<option value="">-- Select Subject --</option>'; $('btnResetFilters').classList.add('hidden'); tearDown(); showNotification('info','Filters reset','Please select your course again.'); }
function tearDown(){ $('chapterContainer').classList.add('hidden'); $('placeholderView').classList.remove('hidden'); }
function renderAuthArea(){
  currentUser=Auth.getStudent();
  if(currentUser){ $('navAuthArea').innerHTML=`<span class="badge">${currentUser.name||'Student'}</span><button class="btn btn-soft btn-small" onclick="snapToPersonalization()">My Profile</button><button class="btn btn-red btn-small" onclick="logoutStudent()">Logout</button><a class="btn btn-dark btn-small" href="admin.html">Admin</a>`; applyProfile(); }
  else $('navAuthArea').innerHTML=`<button class="btn btn-green" onclick="toggleAuthModal(true)">Login / Register</button><a class="btn btn-dark" href="admin.html">Admin</a>`;
}
function toggleAuthModal(show){ $('authModal').classList.toggle('open',!!show); }
function switchAuthTab(tab){ const login=tab==='login'; $('loginView').classList.toggle('hidden',!login); $('signupView').classList.toggle('hidden',login); $('tabLogin').classList.toggle('active',login); $('tabSignup').classList.toggle('active',!login); }
async function registerStudent(e){ e.preventDefault(); const profile={ name:$('regName').value.trim(), phone:$('regPhone').value.trim(), password:$('regPassword').value, class:$('regClass').value, board:$('regBoard').value, medium:$('regMedium').value }; const res=await Auth.register(profile); if(res.ok){ showNotification('success','Profile created','Now login with your phone and password.'); switchAuthTab('login'); $('loginPhone').value=profile.phone; } else showNotification('error','Registration failed',res.message); }
async function loginStudent(e){ e.preventDefault(); const res=await Auth.login($('loginPhone').value.trim(), $('loginPassword').value); if(res.ok){ toggleAuthModal(false); renderAuthArea(); showNotification('success','Login successful','Your personalized dashboard is ready.'); } else showNotification('error','Login failed',res.message); }
function logoutStudent(){ Auth.clearStudent(); currentUser=null; $('personalizationStatusBanner').style.display='none'; renderAuthArea(); resetFilters(); showNotification('info','Logged out','Student session closed.'); }
function applyProfile(){ if(!currentUser)return; activeBrowsingMode='personal'; $('classSelect').value=currentUser.class; onClassChange(); $('boardSelect').value=currentUser.board; onBoardChange(); $('mediumSelect').value=currentUser.medium||'English Medium'; onMediumChange(); $('classSelect').disabled=true; $('boardSelect').disabled=true; $('mediumSelect').disabled=true; $('personalizationStatusBanner').style.display='flex'; $('bannerText').textContent=`Personalized: Class ${currentUser.class} • ${currentUser.board} • ${currentUser.medium||'English Medium'}`; }
function browseAll(){ activeBrowsingMode='all'; ['classSelect','boardSelect','mediumSelect'].forEach(id=>$(id).disabled=false); $('personalizationStatusBanner').style.display='none'; showNotification('info','Browse mode','You can browse other courses now.'); }
function snapToPersonalization(){ if(!Auth.getStudent()){toggleAuthModal(true);return;} applyProfile(); renderChapters(); }
function renderChapters(){ const cls=$('classSelect').value,b=$('boardSelect').value,m=$('mediumSelect').value,s=$('subjectSelect').value; if(!cls||!b||!m||!s){tearDown();return} const key=`${cls}_${b}_${m}_${s}`; const list=repositoryData[key]||[]; $('chapterList').innerHTML=''; if(!list.length){ $('chapterList').innerHTML='<div class="placeholder">Materials uploading soon for this selection.</div>'; } else list.forEach((ch,i)=>$('chapterList').appendChild(chapterNode(ch,i,cls,s))); $('placeholderView').classList.add('hidden'); $('chapterContainer').classList.remove('hidden'); }
function chapterNode(ch,i,cls,subject){ const div=document.createElement('div'); div.className='chapter'; const body=featureButtons(ch,cls,subject); div.innerHTML=`<div class="chapter-head" onclick="toggleChapter(${i})"><div><span class="badge">Chapter ${ch.number}</span><div class="chapter-title">${ch.title}</div></div><span>⌄</span></div><div id="chBody${i}" class="chapter-body"><div class="button-row">${body}</div></div>`; return div; }
function featureButtons(ch,cls,subject){ const f=ch.features||{}; const map=[ ['lesson','Lesson','📚','btn-primary',true], ['mcq','MCQ','📝','btn-amber',true], ['practice','Practice','🎯','btn-soft',true], ['audio','Audio','🔊','btn-soft',true], ['digitalLab','Digital Lab','🔬','btn-green',subject==='Science'], ['grammar','Grammar','🧩','btn-green',subject==='English'], ['answerWriting','Answer Writing','✍️','btn-dark',cls==='10'] ]; return map.filter(x=>x[4]).map(([key,label,ic,clsName])=> f[key]?`<a class="btn ${clsName} btn-small" href="${f[key]}" target="_blank">${ic} ${label}</a>`:`<button class="btn btn-light btn-small" onclick="showNotification('warning','Coming soon','${label} will be added soon.')">${ic} ${label}</button>`).join(''); }
function toggleChapter(i){ document.querySelectorAll('.chapter-body').forEach((el,idx)=>{ if(idx!==i)el.classList.remove('open') }); $('chBody'+i).classList.toggle('open'); }
window.toggleAuthModal=toggleAuthModal; window.switchAuthTab=switchAuthTab; window.logoutStudent=logoutStudent; window.snapToPersonalization=snapToPersonalization; window.toggleChapter=toggleChapter;
