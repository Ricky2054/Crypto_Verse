import { useState, useEffect } from 'react';
import { nftCollections as initialNFTCollections } from './dummyData';

// NFT image URLs - these are placeholder URLs for realistic NFT images
const nftImageUrls = [
  'https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMKg-a5cQgeRw?auto=format&dpr=1&w=1000',
  'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&dpr=1&w=1000',
  'https://i.seadn.io/gae/yIm-M5-BpSDdTEIJRt5D6xphizhIdozXjqSITgK4phWq7MmAU3qE7Nw7POGCiPGyhtJ3ZFP8iJ29TFl-RLcGBWX5qI4-ZcnCPcsY4zI?auto=format&dpr=1&w=1000',
  'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&dpr=1&w=1000',
  'https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?auto=format&dpr=1&w=1000',
  'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&dpr=1&w=1000',
  'https://i.seadn.io/gae/LIpf9z6Ux8uxn69auBME9FCTXpXqSYFo8ZLO1GaM8T7S3hiKScHaClXe0ZdhTv5br6FE2g5i-J5SobhKFsYfe6CIMCv-UfnrlYFWOM4?auto=format&dpr=1&w=1000',
  'https://i.seadn.io/gae/6X867ZmCsuYcjHpx-nmNkXeHaDFd2m-EDEEkExVLKETphkfcrpRJOyzFxRQlc-29J0e-9mB9uDGze3bAfCJCRwA-XmgBxF7bGGrVBw?auto=format&dpr=1&w=1000',
  'https://i.seadn.io/gae/d784iHHbqQFVH1XYD6HoT4u3y_Fsu_7LwuTz_5_xHeUC_XxEBxiSoaznTlN7PJtXJFM0xJpnQXtXkJ0QWWb2dYbOLQ?auto=format&dpr=1&w=1000',
  'https://i.seadn.io/gae/n4wxscRfDO3-5DxlNaH1GkdJ8QYZZwSvGj9w6gCu8JQZRGe-ySSOGlpR6ovjwxiQnfgQH3LNg5ntcQKGjA_7-TnQI1dCYGCw4N4a?auto=format&dpr=1&w=1000'
];

// Collection names for more realistic NFT collections
const collectionNames = [
  'Bored Ape Yacht Club',
  'CryptoPunks',
  'Azuki',
  'Doodles',
  'Cool Cats',
  'World of Women',
  'Moonbirds',
  'CloneX',
  'Pudgy Penguins',
  'Meebits'
];

// Update NFT collections with random changes
const updateNFTCollections = (collections: any[]) => {
  return collections.map((collection) => {
    const floorPriceChange = (Math.random() - 0.5) * 0.05; // -2.5% to +2.5%
    const volumeChange = (Math.random() - 0.5) * 0.1; // -5% to +5%
    const ownersChange = Math.floor(Math.random() * 5) - 2; // -2 to +2
    
    // Store current floor price as previous before updating
    const previousFloorPrice = collection.floorPrice;
    const newFloorPrice = collection.floorPrice * (1 + floorPriceChange);
    
    return {
      ...collection,
      previousFloorPrice: previousFloorPrice,
      floorPrice: newFloorPrice,
      volume24h: collection.volume24h * (1 + volumeChange),
      owners: Math.max(10, collection.owners + ownersChange),
      // Keep the same image URL for consistency
      imageUrl: collection.imageUrl,
    };
  });
};

export const useNFTData = (updateInterval = 2000) => {
  // Initialize with realistic NFT images and names
  const initializedCollections = initialNFTCollections.map((collection, index) => ({
    ...collection,
    name: collection.name || collectionNames[index % collectionNames.length],
    imageUrl: collection.imageUrl || nftImageUrls[index % nftImageUrls.length],
  }));
  
  const [nftCollections, setNFTCollections] = useState(initializedCollections);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setNFTCollections(prev => updateNFTCollections(prev));
    }, updateInterval);
    
    return () => clearInterval(interval);
  }, [updateInterval]);
  
  return { nftCollections };
}; 