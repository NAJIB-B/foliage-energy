const solutionGrid=document.querySelector('.choice-grid');
solutionGrid.addEventListener('click',event=>{
  const choice=event.target.closest('.choice');
  if(!choice)return;
  event.preventDefault();
  event.stopImmediatePropagation();
  document.querySelectorAll('.choice').forEach(item=>item.classList.toggle('selected',item===choice));
  if(choice.dataset.value==='Home essentials'){
    appliancePage.classList.remove('is-hidden');
    appliancePage.classList.add('show');
  }else{
    appliancePage.classList.remove('show');
    appliancePage.classList.add('is-hidden');
  }
},true);
// Defensive fallback: every choice click ends with exactly that one highlighted.
document.querySelectorAll('.choice').forEach(choice=>choice.addEventListener('click',()=>{
  document.querySelectorAll('.choice').forEach(item=>item.classList.toggle('selected',item===choice));
}));
