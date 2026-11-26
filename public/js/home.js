const search = document.querySelector('#mini-program');
const input = search.querySelector('.manual-copy input');

search.querySelector('button').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(input.value);
    search.querySelector('.copy-label').textContent = '已复制';
    search.querySelector('[role="status"]').textContent = '已复制，可粘贴到微信搜索';
    input.parentElement.hidden = true;
  } catch {
    input.parentElement.hidden = false;
    input.focus();
    input.select();
  }
});
