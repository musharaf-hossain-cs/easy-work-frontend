// /* eslint-disable react/self-closing-comp */
// /* eslint-disable react/function-component-definition */
// /* eslint-disable import/no-unresolved */
// import withExternalInfo from 'hoc/withExternalInfo';
// import useGAEventTracker from 'hooks/useGAEventTracker';
// import React from 'react';

// const ExternalInfo = ({ code = '', tutorial = '' }) => {
//  const GAEventsTracker = useGAEventTracker('External Links');

//  return (
//   <h6 className="text-center">
//    {tutorial && (
//     <a
//      href={tutorial}
//      target="_blank"
//      onClick={() => GAEventsTracker('Youtube Tutorials Page', tutorial)}
//      rel="noopener noreferrer"
//     >
//      <span className="badge badge-danger mr-2 p-3">
//       Youtube Tuorial of this demo <i className="fas fa-external-link-alt"></i>
//      </span>
//     </a>
//    )}
//    {code && (
//     <a
//      href={code}
//      target="_blank"
//      onClick={() => GAEventsTracker('Github Tutorials Page', code)}
//      rel="noopener noreferrer"
//     >
//      <span className="badge badge-secondary mr-2 p-3">
//       Github Source Code <i className="fas fa-external-link-alt"></i>
//      </span>
//     </a>
//    )}
//   </h6>
//  );
// };

// export default withExternalInfo(ExternalInfo);
