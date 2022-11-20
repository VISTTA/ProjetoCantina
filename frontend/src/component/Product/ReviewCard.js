import React from 'react'
import ReactStars from 'react-rating-stars-component'
import profileSvg from "../../images/usuario.svg"

const ReviewCard = ({ review }) => {
  
    const options = {
        edit: false, 
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
      }

    return (
    <div className="reviewCard">
        <img src={profileSvg} alt="User" />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;