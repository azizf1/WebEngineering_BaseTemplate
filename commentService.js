export const toggleComments = () => {
  const showHideBtn = document.querySelector('.show-hide');
  const commentWrapper = document.querySelector('.comment-wrapper');
  commentWrapper.style.display = 'none';

  showHideBtn.addEventListener("click", () => {
    const isHidden = commentWrapper.style.display === 'none';
    showHideBtn.textContent = isHidden ? 'Hide comments' : 'Show comments';
    commentWrapper.style.display = isHidden ? 'block' : 'none';
  });
};

export const addComment = () => {
  const form = document.querySelector('.comment-form');
  const nameField = document.querySelector('#name');
  const commentField = document.querySelector('#comment');
  const list = document.querySelector('.comment-container');

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!nameField.value.trim() || !commentField.value.trim()) {
      alert("Both name and comment fields must be filled out!");
      return; 
    }

    const listItem = document.createElement('li');
    const namePara = document.createElement('p');
    const commentPara = document.createElement('p');

    namePara.textContent = nameField.value;
    commentPara.textContent = commentField.value;

    listItem.append(namePara, commentPara);
    list.appendChild(listItem);

    nameField.value = '';
    commentField.value = '';
  });
};
