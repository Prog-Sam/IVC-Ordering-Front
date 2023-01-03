import React from 'react';
import moment from 'moment';
import RTAA from 'react-textarea-autosize';

// const AnnouncementBoard = ({ items }) => {
//   return (
//     <div>
//       <h3>Announcements</h3>
//       {items.map((i) => (
//         <div>
//           <hr />
//           <table className='table'>
//             <thead>
//               <row>
//                 <th className='align-middle'>Posted by: {i.UserId.name}</th>
//                 <th className='align-middle'>
//                   Date: {moment(i.date).format('MM/DD/YYYY HH:mm:ss')}
//                 </th>
//               </row>
//             </thead>
//             <tbody>
//               <row>
//                 <td colSpan={2} className='align-middle'>
//                   <h6 className='align-middle'>{i.title}</h6>
//                 </td>
//               </row>
//               <row>
//                 <td colSpan={2}>{i.message}</td>
//               </row>
//             </tbody>
//           </table>
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// };

const AnnouncementBoard = ({ items }) => {
  return (
    <div>
      <br />
      <h3>Announcements</h3>
      {items.map((i) => (
        <div>
          <hr />
          <div className='row'>
            <div className='col'>Posted By: {i.UserId.name}</div>
            <div className='col'>
              Posted On: {moment(i.date).format('ddd MM/DD/YYYY HH:mm:ss')}
            </div>
          </div>
          <br />
          <div className='row'>
            <div className='col col-span2'>
              <h5>{i.title}</h5>
            </div>
          </div>
          <div className='row'>
            <div className='col col-span2'>
              <RTAA
                style={{ resize: 'none' }}
                className='form-control d-flex align-items-left'
                name={i.title}
                value={i.message}
                readOnly={true}
              />
            </div>
          </div>
        </div>
      ))}
      <hr />
    </div>
  );
};

export default AnnouncementBoard;
