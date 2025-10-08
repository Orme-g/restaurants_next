import styles from "./BlogData.module.scss";

const BlogData = () => {
    return <div>Блог в разработке...</div>;
};

export default BlogData;

// import React, { useState } from "react";
// import { Button } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import "./blogProfileData.scss";

// import { calculateStatus } from "../../utils/calculateExperience";
// import EditSingleField from "../forms/editSingleField/EditSingleField";

// import type { IBlogData } from "../../types/userData";
// interface IBlogProfileData {
//     blogData: IBlogData;
// }

// const BlogProfileData: React.FC<IBlogProfileData> = ({ blogData }) => {
//     const [editAboutField, setEditAboutField] = useState(false);
//     const [editCityField, setEditCityField] = useState(false);
//     const { blogerName, aboutMe, blogCity, blogPostsCount, blogerRating, blogAvatar } = blogData;
//     const status = calculateStatus(blogerRating);

//     const handleEditField = (field: "aboutMe" | "blogCity") => {
//         switch (field) {
//             case "aboutMe":
//                 setEditAboutField((editAboutField) => !editAboutField);
//                 break;
//             case "blogCity":
//                 setEditCityField((editCityField) => !editCityField);
//                 break;
//         }
//     };
//     return (
//         <>
//             <div className="blog-data__blog-subtitle">Вы ведёте блог</div>
//             <div className="blog-data__userdata_item">
//                 <img src={blogAvatar} alt="blogAvatar" />
//             </div>
//             <div className="blog-data__userdata_item">
//                 <div className="blog-data__data-field">В блоге вас знают как:</div>
//                 <div className="blog-data__data-value">{blogerName}</div>
//             </div>
//             <div className="blog-data__userdata_item">
//                 <div className="blog-data__data-field">Что вы написали о себе:</div>
//                 <div className="blog-data__data-value">
//                     {editAboutField ? (
//                         <EditSingleField
//                             field={"aboutMe"}
//                             value={aboutMe}
//                             displayHandler={handleEditField}
//                         />
//                     ) : (
//                         aboutMe
//                     )}
//                     <Button
//                         size="medium"
//                         variant="text"
//                         onClick={() => handleEditField("aboutMe")}
//                         sx={{
//                             marginLeft: "10px",
//                             color: "#494949",
//                             paddingTop: 0,
//                             paddingBottom: 0,
//                         }}
//                     >
//                         {editAboutField ? "Отмена" : null}
//                         <EditIcon fontSize="small" />
//                     </Button>
//                 </div>
//             </div>
//             <div className="blog-data__userdata_item">
//                 <div className="blog-data__data-field">Город:</div>
//                 <div className="blog-data__data-value">
//                     {editCityField ? (
//                         <EditSingleField
//                             field={"blogCity"}
//                             value={blogCity}
//                             displayHandler={handleEditField}
//                         />
//                     ) : (
//                         blogCity
//                     )}

//                     <Button
//                         size="medium"
//                         variant="text"
//                         onClick={() => handleEditField("blogCity")}
//                         className="edit-button"
//                         sx={{
//                             marginLeft: "10px",
//                             color: "#494949",
//                             paddingTop: 0,
//                             paddingBottom: 0,
//                         }}
//                     >
//                         {editCityField ? "Отмена" : null}
//                         <EditIcon fontSize="small" />
//                     </Button>
//                     {/* {blogCity} */}
//                 </div>
//             </div>
//             <div className="blog-data__userdata_item">
//                 <div className="blog-data__data-field">Всего постов:</div>
//                 <div className="blog-data__data-value">{blogPostsCount}</div>
//             </div>
//             <div className="blog-data__userdata_item">
//                 <div className="blog-data__data-field">Ваш рейтинг:</div>
//                 <div className="blog-data__data-value">{blogerRating}</div>
//             </div>
//             <div className="blog-data__userdata_item">
//                 <div className="blog-data__data-field">Ваш статус:</div>
//                 <div className="blog-data__data-value">{status}</div>
//             </div>
//         </>
//     );
// };

// export default BlogProfileData;
