import React from 'react';

export const NumberField = ({ field, iconName ,errorClass }: any) => (
  <div className="mb-4 w-full">
    <input
      name={field.name}
      type="number"
      className={`w-full border-0 border-b-2 ${errorClass} outline-none px-3 py-2 bg-transparent text-gray-500`}
      placeholder={field.label}
    />
    {(errorClass === 'border-red-500' || iconName) && (
      <span className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2 text-gray-400 pointer-events-none">
        {errorClass === 'border-red-500' && (
          <i className="fa-solid fa-circle-exclamation" style={{ color: '#e01b24' }}></i>
        )}
        {iconName && (
          <i className={`${iconName} fa-lg`}></i>
        )}
      </span>
    )}
  </div>
);
