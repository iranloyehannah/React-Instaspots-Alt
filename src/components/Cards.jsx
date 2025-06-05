import cards from "../cards.json";
import { Box, Typography, IconButton, Modal } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState, forwardRef, useImperativeHandle } from "react";

// Import all images
import image1 from "../assets/images/val-thoren.png";
import image2 from "../assets/images/restaurant-terrace.png";
import image3 from "../assets/images/outdoor-cafe.png";
import image4 from "../assets/images/long-bridge.png";
import image5 from "../assets/images/tunnel.png";
import image6 from "../assets/images/cabin.png";

// Map image paths to imported images
const imageMap = {
  "assets/images/val-thoren.png": image1,
  "assets/images/restaurant-terrace.png": image2,
  "assets/images/outdoor-cafe.png": image3,
  "assets/images/long-bridge.png": image4,
  "assets/images/tunnel.png": image5,
  "assets/images/cabin.png": image6,
};

const CardDisplay = forwardRef((props, ref) => {
  const [isLiked, setIsLiked] = useState({});
  const [isSelectedImg, setIsSelectedImg] = useState(null);
  const [cardImages, setCardImages] = useState(cards);

  const handleLike = (index) => {
    setIsLiked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleImageClick = (card, index) => {
    setIsSelectedImg({ ...card, index });
  };
  const handleCloseModal = () => {
    setIsSelectedImg(null);
  };

  useImperativeHandle(ref, () => ({
    handleNewPost: (newPost) => {
      setCardImages((prev) => [
        {
          image: newPost.image,
          text: newPost.text,
        },
        ...prev,
      ]);
    },
  }));

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 3,
        p: 3,
        backgroundColor: "background.default",
      }}
    >
      {cardImages.map((card, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 1,
            cursor: "pointer",
            "&:hover": {
              boxShadow: 3,
              transform: "scale(1.02)",
              transition: "all 0.3s ease-in-out",
            },
          }}
          onClick={() => handleImageClick(card, index)}
        >
          <img
            src={
              card.image.startsWith("data:") ? card.image : imageMap[card.image]
            }
            alt={card.text}
            title={card.text}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              display: "block",
            }}
          />
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "background.default",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                fontWeight: 500,
                maxWidth: "80%",
              }}
            >
              {card.text}
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleLike(index);
              }}
              sx={{
                color: isLiked[index] ? "error.main" : "text.secondary",
                "&:hover": {
                  transform: "scale(1.1)",
                  transition: "transform 0.2s ease-in-out",
                },
              }}
            >
              {isLiked[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
        </Box>
      ))}
      {/* Image Preview Modal */}
      <Modal
        open={Boolean(isSelectedImg)}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: { xs: "90vw", sm: "70vw", md: "50vw" }, // responsive widths
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            overflow: "auto",
            outline: "none"
          }}
        >
          {isSelectedImg && (
            <>
              <img
                src={
                  isSelectedImg.image.startsWith("data:")
                    ? isSelectedImg.image
                    : imageMap[isSelectedImg.image]
                }
                alt={isSelectedImg.text}
                style={{
                  width: "100%",
                  height:"auto",
                  maxHeight: "70vh",
                  objectFit: "cover",
                  display: "block"
                }}
              />
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "background.paper",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "text.primary",
                    fontWeight: 500,
                  }}
                >
                  {isSelectedImg.text}
                </Typography>
                <IconButton
                  onClick={() => handleLike(isSelectedImg.index)}
                  sx={{
                    color: isLiked[isSelectedImg.index]
                      ? "error.main"
                      : "text.secondary",
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "transform 0.2s ease-in-out",
                    },
                  }}
                >
                  {isLiked[isSelectedImg.index] ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
});

export default CardDisplay;
