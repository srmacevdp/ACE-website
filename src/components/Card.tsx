import React from 'react';

interface ProfileCardProps {
    image : string;
    link? : string;
}

const ProfileCard : React.FC<ProfileCardProps> = ({image,link}) => {
  return (
    <div className="flex items-center hover:shadow-[0_0_10px_#0ff,0_0_20px_#0ff,0_0_30px_#0ff] transition-all duration-300 cursor-pointer bg-white/10 backdrop-blur-md border rounded-2xl shadow-lg md:p-2 p-3 w-md  mx-auto">
      {/* Image */}
      <a href={link} className='mx-auto'>
      <img
        src={image}
        alt="Profile"
        className="w-full md:h-45 h-30 rounded-full object-contain object-center border-white"
      />
      </a>

    </div>
  );
};

export default ProfileCard;
