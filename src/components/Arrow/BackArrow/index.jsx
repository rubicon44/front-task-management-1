import { useNavigate } from 'react-router-dom';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { BackArrowIconCover } from 'src/components/Arrow/BackArrow/style';

export const BackArrow = () => {
  const navigate = useNavigate();
  const handleBackArrowClick = () => {
    navigate(-1);
  };

  return (
    <BackArrowIconCover>
      <ArrowBackIosOutlinedIcon onClick={handleBackArrowClick} />
    </BackArrowIconCover>
  );
};
