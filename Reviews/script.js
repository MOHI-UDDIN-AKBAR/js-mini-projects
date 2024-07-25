const reviewers = [
  {
    reviewerName: "Elon Musk",
    reviewerImg: {
      img: "./Assets/Images/avatarOne.webp",
      alt: `Avatar of Elon Musk`,
    },
    reviewerRole: "Full Stack Developer",
    reviewerInfo:
      "Primarily known for his work in space exploration and electric vehicles, his leadership in technology companies like SpaceX and Tesla demonstrates a full stack approach to problem-solving and innovation.",
  },
  {
    reviewerName: "Ada Lovelace",
    reviewerImg: {
      img: "./Assets/Images/avatarTwo.webp",
      alt: `Avatar of Ada Lovelace`,
    },
    reviewerRole: "Software Developer",
    reviewerInfo:
      "Known as the world's first computer programmer, Ada Lovelace's work laid the foundation for software development.",
  },
  {
    reviewerName: "Grace Hopper",
    reviewerImg: {
      img: "./Assets/Images/avatarFour.webp",
      alt: `Avatar of Grace Hopper`,
    },
    reviewerRole: "Web Developer",
    reviewerInfo:
      "A pioneer in computer science who developed COBOL, a programming language fundamental in web development.",
  },
  {
    reviewerName: "Jane Austen",
    reviewerImg: {
      img: "./Assets/Images/avatarThree.webp",
      alt: `Avatar of Jane Austen`,
    },
    reviewerRole: "Front-End Developer",
    reviewerInfo:
      "While not a developer in the modern sense, her understanding of human behavior and social interactions contributed significantly to the principles of good UX/UI design.",
  },
  {
    reviewerName: "Linus Torvalds",
    reviewerImg: {
      img: "./Assets/Images/avatarFive.webp",
      alt: `Avatar of Linus Torvalds`,
    },
    reviewerRole: "Back-End Developer",
    reviewerInfo:
      "Creator of Linux and Git, his contributions have been pivotal in the development of secure and efficient back-end systems.",
  },
];

const container = document.querySelector(".container");
const previousButton = document.querySelector(".pagination .previous");
const nextButton = document.querySelector(".pagination .next");
const surpriseButton = document.querySelector(".random-avatar");

let currentIndex = 0;

function updateReviewer({
  reviewerImg: { img, alt },
  reviewerName: name,
  reviewerRole: role,
  reviewerInfo: info,
}) {
  container.innerHTML = `   
        <img src="${img}" alt="${alt}" width="60" height="60" />
        <div class="name-and-role">
          <h3>${name}</h3>
          <span>${role}</span>
        </div>
        <p>
        ${info}
        </p>
      `;
}

updateReviewer(reviewers[0]);

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % reviewers.length;
  updateReviewer(reviewers[currentIndex]);
});

previousButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + reviewers.length) % reviewers.length;
  updateReviewer(reviewers[currentIndex]);
});

surpriseButton.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * reviewers.length);
  updateReviewer(reviewers[randomIndex]);
});
