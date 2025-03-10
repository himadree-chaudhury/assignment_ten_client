// import { useState } from "react";
// import { Rating } from "react-simple-star-rating";

// const StarRatingComponent = () => {
//   const [rating, setRating] = useState(3);

//   const handleRating = (rate) => {
//     setRating(rate);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-2">Rate this product</h2>
//       <div className="">
//         <Rating
//           onClick={handleRating}
//           initialValue={rating}
//           size={30}
//           fillColor="gold"
//           emptyColor="gray"
//           allowFraction={false}
//         />
//       </div>
//       <p className="mt-2 text-lg">Your rating: {rating} stars</p>
//     </div>
//   );
// };

// export default StarRatingComponent;
import React from "react";
import { useForm } from "react-hook-form";

export default function Test() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("Genre")} multiple>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Animation">Animation</option>
        <option value="Biography">Biography</option>
        <option value="Comedy">Comedy</option>
        <option value="Crime">Crime</option>
        <option value="Documentary">Documentary</option>
        <option value="Drama">Drama</option>
        <option value="Family">Family</option>
        <option value="Fantasy">Fantasy</option>
        <option value="History">History</option>
        <option value="Horror">Horror</option>
        <option value="Musical">Musical</option>
        <option value="Mystery">Mystery</option>
        <option value="Romance">Romance</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Sports">Sports</option>
        <option value="Thriller">Thriller</option>
        <option value="War">War</option>
        <option value="Western">Western</option>
      </select>

      <input type="submit" />
    </form>
  );
}
