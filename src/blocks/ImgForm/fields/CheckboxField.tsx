import React from 'react';

export const CheckboxField = ({ field, iconName ,errorClass }: any) => (
  <div className="mb-4 flex items-center">
    <input
      id={field.name}
      name={field.name}
      type="checkbox"
      className={`mr-2 accent-primary ${errorClass}`}
    />
    <label htmlFor={field.name} className="text-gray-700">
      {field.label}
    </label>
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
