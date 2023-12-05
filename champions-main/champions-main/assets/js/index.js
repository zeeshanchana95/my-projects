import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, get, set } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
  databaseURL: 'https://champions-43e15-default-rtdb.firebaseio.com/',
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const commentsInDb = ref(database, 'comments')

const textareaEl = document.getElementById('textarea')
const inputFromEl = document.getElementById('input-from-el')
const inputToEl = document.getElementById('input-to-el')
const publishBtn = document.getElementById('publish')
const likesEl = document.getElementById('likes')
let commentsSectionEl = document.getElementById('comments')


const comment = {
  from: "",
  text: "",
  to: "",
  likes: 0
}

publishBtn.addEventListener('click', function () {

  if (textareaEl.value != "") {
    comment.from = inputFromEl.value
    comment.text = textareaEl.value
    comment.to = inputToEl.value
    comment.likes = 0

    push(commentsInDb, comment)

    commentsSectionEl.style.color = ""
    commentsSectionEl.style.textAlign = ""

    clearTextArea()
  } else {
    commentsSectionEl.style.color = "red"
    commentsSectionEl.style.textAlign = "center"
    commentsSectionEl.textContent = "The text area can't be blank!"
  }

})

onValue(commentsInDb, function (snapshot) {
  if (snapshot.exists()) {
    let commentsArray = Object.entries(snapshot.val())
    clearCommentSection()

    for (const [key, value] of commentsArray) {
      appendCommentToEndorsements(value, key)
    }
  } else {
    clearCommentSection()
  }
})

function clearTextArea() {
  textareaEl.value = ""
  inputFromEl.value = ""
  inputToEl.value = ""
}

function appendCommentToEndorsements(comment, id) {
  let newComment = `
    <div class="comment-wrapper">
      <h4>To ${comment.to}</h4>
      <p class="comment-text">${comment.text}</p>
    
      <div id="comments-footer" class="comments-footer">
        <h4>From ${comment.from}</h4>
        <p class="like-button">❤️<span class="like-count" data-id="${id}">${comment.likes}</span></p>
      </div>
    </div>
  `

  commentsSectionEl.insertAdjacentHTML('beforeend', newComment);
}

commentsSectionEl.addEventListener('click', function (event) {
  if (event.target.classList.contains('like-button')) {
    const commentId = event.target.parentElement.querySelector('.like-count').getAttribute('data-id')

    updateLikesCountInDatabase(commentId)
  }
})

function getUserLikesRef(commentId) {
  return ref(database, `comments/${commentId}/${comment.likes}`);
}

function updateLikesCountInDatabase(commentId) {
  const commentRef = ref(database, `comments/${commentId}`);
  const userLikesRef = getUserLikesRef(commentId);
  return get(userLikesRef)
    .then(snapshot => {
      if (snapshot.exists()) {
        console.log("User already liked this comment.");
        return;
      }
      return get(commentRef)
        .then(snapshot => {
          if (!snapshot.exists()) {
            throw new Error("Comment not found in the database");
          }
          const currentComment = snapshot.val();
          const currentLikes = currentComment.likes || 0;
          currentComment.likes = currentLikes + 1;
          return Promise.all([
            set(commentRef, currentComment),
            set(userLikesRef, true)
          ]).then(() => {
            console.log("Like updated successfully.");
          });
        });
    })
    .catch(error => {
      console.error("Error updating likes count: ", error);
    });
}

function clearCommentSection() {
  commentsSectionEl.innerHTML = "";
}