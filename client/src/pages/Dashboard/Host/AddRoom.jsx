import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { uploadImageToCloud } from "../../../helper/uploadImageToCloud";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { toastAlert } from "../../../helper/helper";
import { useNavigate } from "react-router-dom";
const AddRoom = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [prevImage, setPrevImage] = useState(null);
  const [showText, setShowText] = useState();
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosSecure.post("/room", formData);
      return data;
    },
    onSuccess: () => {
      toastAlert("Room Created Successful", "success");
      navigate("/dashboard/my-listings");
    },
  });

  const handleDates = (item) => {
    setDates(item.selection);
  };

  // Handle Add Room
  const handleAddRoom = async (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const title = form.title.value;
    const category = form.category.value;
    const price = form.price.value;
    const total_guest = form.total_guest.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const from = dates.startDate;
    const to = dates.endDate;
    const roomImage = form.image.files[0];

    try {
      setLoading(true);
      const resImage = await uploadImageToCloud(roomImage);
      const roomInfo = {
        location,
        title,
        category,
        price,
        total_guest,
        bedrooms,
        bathrooms,
        description,
        image: resImage?.data?.display_url,
        from,
        to,
        host: {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        },
      };

      await mutateAsync(roomInfo);
      setLoading(false);
    } catch (error) {
      toastAlert(error.message, "error");
      setLoading(false);
    }
  };

  // Handle Prev Image and Text
  const handlePrevImageAndText = (file) => {
    setPrevImage(URL.createObjectURL(file));
    setShowText(file.name);
  };
  return (
    <div>
      <AddRoomForm
        handleDates={handleDates}
        dates={dates}
        handleAddRoom={handleAddRoom}
        loading={loading}
        handlePrevImageAndText={handlePrevImageAndText}
        prevImage={prevImage}
        showText={showText}
      />
    </div>
  );
};

export default AddRoom;
