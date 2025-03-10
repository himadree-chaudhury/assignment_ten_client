import { useState } from "react";
import { Rating } from "react-simple-star-rating";
// import Swal from "sweetalert2";

const Test = () => {
  const [rating, setRating] = useState(3);

  const handleRating = (rate) => {
      setRating(rate);
//       Swal.fire({
//       title: "Drag me!",
//       icon: "success",
//       draggable: true,
//     });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Rate this product</h2>
      <div className="">
        <Rating
          onClick={handleRating}
          initialValue={rating}
          size={30}
          fillColor="gold"
          emptyColor="gray"
          allowFraction={false}
        />
      </div>
      <p className="mt-2 text-lg">Your rating: {rating} stars</p>
    </div>
  );
};

export default Test;
