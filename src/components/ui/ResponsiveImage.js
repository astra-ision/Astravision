'use client'

import { useState } from 'react';
import Image from 'next/image';

export default function ResponsiveImage({ 
  src, 
  alt, 
  mobileSrc = null,
  width = 1000, 
  height = 600,
  className = "",
  priority = false 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use mobileSrc on small screens if provided
  const imgSrc = mobileSrc && window.innerWidth < 640 ? mobileSrc : src;
  
  return (
    <div className={`relative overflow-hidden ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={priority ? 'eager' : 'lazy'}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
      />
    </div>
  );
} 