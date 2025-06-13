import React from 'react';

export const TextareaField = ({ field, iconName, errorClass }: any) => (
  <div className="mb-8 text-left w-full relative">
    <textarea
      name={field.name}
      className={`w-full h-28 text-gray-500 text-xl resize-none border-0 border-b-2 transition-colors duration-300 ${errorClass} outline-none px-3 py-2 bg-transparent`}
      placeholder={field.label}
    />
    {(errorClass === 'border-red-500' || iconName) && (
      <span className="absolute right-3 translate-y-2 text-gray-400 pointer-events-none">
        {errorClass === 'border-red-500' && (
          <i className="fa-solid fa-circle-exclamation fa-lg mr-2" style={{ color: '#e01b24' }}></i>
        )}
        {iconName && (
          <i className={`${iconName} fa-xl`}></i>
        )}
      </span>
    )}
  </div>
);
