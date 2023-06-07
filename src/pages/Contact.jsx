import React from "react";

const Contact = () => {
  const contactImg = [
    {
      id: 1,
      img: "https://img.icons8.com/color/48/000000/linkedin.png",
      link: "https://www.linkedin.com",
    },
    {
      id: 2,
      img: "https://img.icons8.com/color/48/000000/twitter.png",
      link: "https://twitter.com",
    },
    {
      id: 3,
      img: "https://img.icons8.com/color/48/000000/facebook.png",
      link: "https://www.facebook.com",
    },
    // create an object for github
    {
      id: 4,
      img: "https://img.icons8.com/color/48/000000/github--v1.png",
      link: "https://github.com",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-60">
      <header>
        <p className="text-center text-2xl text-white animate-slideright">
          Contact Me
        </p>
      </header>
      <div className="flex justify-center mt-2 animate-slidedown">
        {contactImg.map((item) => (
          <div
            className="flex flex-col justify-center items-center p-4"
            key={item.id}
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer "
              className="transition-transform duration-500 ease-out hover:scale-110"
            >
              <img src={item.img} alt="Contact Icon" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
