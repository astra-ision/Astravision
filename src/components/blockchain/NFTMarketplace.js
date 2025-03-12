'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function NFTMarketplace() {
  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('explore');
  const [connected, setConnected] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'art', name: 'Art' },
    { id: 'collectibles', name: 'Collectibles' },
    { id: 'pfp', name: 'Profile Pictures' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'sports', name: 'Sports' },
    { id: 'photography', name: 'Photography' },
    { id: 'music', name: 'Music' },
    { id: 'metaverse', name: 'Metaverse' },
    { id: 'utility', name: 'Utility' },
    { id: 'domains', name: 'Domains' }
  ];
  
  const priceFilters = [
    { id: 'all', name: 'All Prices' },
    { id: 'under1', name: 'Under 1 ETH' },
    { id: '1to5', name: '1 - 5 ETH' },
    { id: 'over5', name: 'Over 5 ETH' }
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock NFTs data
        const mockNFTs = [
          {
            id: 'nft-001',
            name: 'Abstract Dimensions #42',
            description: 'A journey through abstract dimensions represented in vibrant colors',
            imageUrl: 'https://images.unsplash.com/photo-1634986666676-ec4426788ff2?q=80&w=1000&auto=format&fit=crop',
            creator: '0x8Fc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c620',
            creatorName: 'ArtisticVisions',
            owner: '0x1Fc8A4Dfd37AfB9F0B3e4CbB95401F2F9B27c456',
            ownerName: 'GalleryOne',
            price: 2.5,
            currency: 'ETH',
            collection: 'Abstract Visions',
            category: 'art',
            tokenId: '42',
            tokenStandard: 'ERC-721',
            blockchain: 'Ethereum',
            listed: true,
            createdAt: '2023-02-15',
            lastSold: '2023-03-01',
            lastSoldPrice: 2.1
          },
          {
            id: 'nft-002',
            name: 'Crypto Punk #1337',
            description: 'A unique Crypto Punk character with rare attributes',
            imageUrl: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=1000&auto=format&fit=crop',
            creator: '0x7Bc5d6Ada37AfB9F0B3e4CAa95401F2F9B27c890',
            creatorName: 'CryptoPunks',
            owner: '0x2Da4Afce37Aab9F0B3e4CAa95401F2F9B27c123',
            ownerName: 'NFTCollector',
            price: 75.0,
            currency: 'ETH',
            collection: 'CryptoPunks',
            category: 'pfp',
            tokenId: '1337',
            tokenStandard: 'ERC-721',
            blockchain: 'Ethereum',
            listed: true,
            createdAt: '2021-05-10',
            lastSold: '2022-11-15',
            lastSoldPrice: 65.0
          },
          {
            id: 'nft-003',
            name: 'Serenity Beach',
            description: 'A peaceful photograph of a serene beach at sunset',
            imageUrl: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1000&auto=format&fit=crop',
            creator: '0x9Ca5d6Afe37AaA9F0B3e4CAa95401F2F9B27c456',
            creatorName: 'NatureCaptures',
            owner: '0x9Ca5d6Afe37AaA9F0B3e4CAa95401F2F9B27c456',
            ownerName: 'NatureCaptures',
            price: 0.75,
            currency: 'ETH',
            collection: 'Natural Wonders',
            category: 'photography',
            tokenId: '58',
            tokenStandard: 'ERC-721',
            blockchain: 'Ethereum',
            listed: true,
            createdAt: '2023-01-20',
            lastSold: null,
            lastSoldPrice: null
          },
          {
            id: 'nft-004',
            name: 'Cosmic Harmony',
            description: 'An exploration of cosmic harmony through digital art',
            imageUrl: 'https://images.unsplash.com/photo-1607893378714-007fd47c8719?q=80&w=1000&auto=format&fit=crop',
            creator: '0x8Fc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c620',
            creatorName: 'ArtisticVisions',
            owner: '0x3Eb5d6Cde37AaA9F0B3e4CAa95401F2F9B27c789',
            ownerName: 'CosmicCollector',
            price: 1.8,
            currency: 'ETH',
            collection: 'Abstract Visions',
            category: 'art',
            tokenId: '87',
            tokenStandard: 'ERC-721',
            blockchain: 'Ethereum',
            listed: true,
            createdAt: '2023-02-28',
            lastSold: '2023-03-10',
            lastSoldPrice: 1.5
          },
          {
            id: 'nft-005',
            name: 'Virtual Estate Alpha',
            description: 'A premium virtual estate in the Alpha district of MetaVerse',
            imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
            creator: '0x5Dc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c123',
            creatorName: 'MetaArchitects',
            owner: '0x5Dc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c123',
            ownerName: 'MetaArchitects',
            price: 12.0,
            currency: 'ETH',
            collection: 'Virtual Estates',
            category: 'metaverse',
            tokenId: '42',
            tokenStandard: 'ERC-721',
            blockchain: 'Ethereum',
            listed: true,
            createdAt: '2023-01-05',
            lastSold: null,
            lastSoldPrice: null
          },
          {
            id: 'nft-006',
            name: 'Digital Symphony #3',
            description: 'A musical composition encoded as an NFT with unique audio visualization',
            imageUrl: 'https://images.unsplash.com/photo-1623944889288-cd147dbb517c?q=80&w=1000&auto=format&fit=crop',
            creator: '0x6Ab5d6Afe37AaA9F0B3e4CAa95401F2F9B27c567',
            creatorName: 'SoundWave',
            owner: '0x7Fc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c890',
            ownerName: 'MusicLover',
            price: 3.2,
            currency: 'ETH',
            collection: 'Digital Symphony',
            category: 'music',
            tokenId: '3',
            tokenStandard: 'ERC-721',
            blockchain: 'Ethereum',
            listed: true,
            createdAt: '2023-02-10',
            lastSold: '2023-03-05',
            lastSoldPrice: 2.8
          },
          {
            id: 'nft-007',
            name: 'Axie Infinity Legend',
            description: 'Rare gaming character with unique abilities and traits',
            imageUrl: 'https://images.unsplash.com/photo-1616414627817-42b4d91bcde6?q=80&w=1000&auto=format&fit=crop',
            creator: '0x7Bc5d6Ada37AfB9F0B3e4CAa95401F2F9B27c123',
            creatorName: 'AxieCreator',
            owner: '0x8Fc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c789',
            ownerName: 'GameMaster',
            price: 4.7,
            currency: 'ETH',
            collection: 'Axie Legends',
            category: 'gaming',
            tokenId: '897',
            tokenStandard: 'ERC-721',
            blockchain: 'Ronin',
            listed: true,
            createdAt: '2022-08-15',
            lastSold: '2023-01-22',
            lastSoldPrice: 3.9
          },
          {
            id: 'nft-008',
            name: 'NBA Top Shot #154',
            description: 'Iconic basketball moment captured as a collectible NFT',
            imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop',
            creator: '0x9Ca5d6Afe37AaA9F0B3e4CAa95401F2F9B27c890',
            creatorName: 'NBAtopshot',
            owner: '0x1Fc8A4Dfd37AfB9F0B3e4CbB95401F2F9B27c123',
            ownerName: 'SportsCollector',
            price: 0.85,
            currency: 'ETH',
            collection: 'NBA Moments',
            category: 'sports',
            tokenId: '154',
            tokenStandard: 'ERC-721',
            blockchain: 'Flow',
            listed: true,
            createdAt: '2022-11-30',
            lastSold: '2023-02-15',
            lastSoldPrice: 0.65
          },
          {
            id: 'nft-009',
            name: 'ENS Domain: crypto.eth',
            description: 'Premium Ethereum Name Service domain for Web3 identity',
            imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop',
            creator: '0x1Fc8A4Dfd37AfB9F0B3e4CbB95401F2F9B27c789',
            creatorName: 'ENSRegistry',
            owner: '0x2Da4Afce37Aab9F0B3e4CAa95401F2F9B27c890',
            ownerName: 'DomainCollector',
            price: 15.0,
            currency: 'ETH',
            collection: 'ENS Domains',
            category: 'domains',
            tokenId: '2347',
            tokenStandard: 'ERC-721',
            blockchain: 'Ethereum',
            listed: true,
            createdAt: '2021-10-15',
            lastSold: '2022-08-30',
            lastSoldPrice: 12.5
          },
          {
            id: 'nft-010',
            name: 'Access Pass: VIP',
            description: 'Exclusive access to premium content and community benefits',
            imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
            creator: '0x3Eb5d6Cde37AaA9F0B3e4CAa95401F2F9B27c456',
            creatorName: 'MembershipDAO',
            owner: '0x5Dc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c890',
            ownerName: 'CryptoWhale',
            price: 1.2,
            currency: 'ETH',
            collection: 'Access Passes',
            category: 'utility',
            tokenId: '331',
            tokenStandard: 'ERC-1155',
            blockchain: 'Ethereum',
            listed: true,
            createdAt: '2023-01-15',
            lastSold: '2023-03-02',
            lastSoldPrice: 1.0
          }
        ];
        
        // Mock collections data
        const mockCollections = [
          {
            id: 'collection-001',
            name: 'Abstract Visions',
            description: 'A collection of abstract digital art pieces',
            creator: '0x8Fc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c620',
            creatorName: 'ArtisticVisions',
            itemCount: 48,
            floorPrice: 1.8,
            totalVolume: 125.5,
            category: 'art',
            verified: true,
            bannerUrl: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=1000&auto=format&fit=crop',
            logoUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=300&auto=format&fit=crop'
          },
          {
            id: 'collection-002',
            name: 'CryptoPunks',
            description: 'The original collection of 10,000 unique pixel art characters',
            creator: '0x7Bc5d6Ada37AfB9F0B3e4CAa95401F2F9B27c890',
            creatorName: 'CryptoPunks',
            itemCount: 10000,
            floorPrice: 68.5,
            totalVolume: 825000,
            category: 'pfp',
            verified: true,
            bannerUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop',
            logoUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=300&auto=format&fit=crop'
          },
          {
            id: 'collection-003',
            name: 'Natural Wonders',
            description: 'Breathtaking photography of natural landscapes from around the world',
            creator: '0x9Ca5d6Afe37AaA9F0B3e4CAa95401F2F9B27c456',
            creatorName: 'NatureCaptures',
            itemCount: 124,
            floorPrice: 0.75,
            totalVolume: 45.2,
            category: 'photography',
            verified: true,
            bannerUrl: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=1000&auto=format&fit=crop',
            logoUrl: 'https://images.unsplash.com/photo-1581922814484-0b48460b7010?q=80&w=300&auto=format&fit=crop'
          },
          {
            id: 'collection-004',
            name: 'Digital Symphony',
            description: 'Musical compositions encoded as NFTs with unique visualizations',
            creator: '0x6Ab5d6Afe37AaA9F0B3e4CAa95401F2F9B27c567',
            creatorName: 'SoundWave',
            itemCount: 15,
            floorPrice: 2.4,
            totalVolume: 28.5,
            category: 'music',
            verified: false,
            bannerUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop',
            logoUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop'
          },
          {
            id: 'collection-005',
            name: 'Virtual Estates',
            description: 'Premium virtual real estate in the MetaVerse',
            creator: '0x5Dc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c123',
            creatorName: 'MetaArchitects',
            itemCount: 75,
            floorPrice: 8.5,
            totalVolume: 320.0,
            category: 'metaverse',
            verified: true,
            bannerUrl: 'https://images.unsplash.com/photo-1624395747186-4ebe0eef2448?q=80&w=1000&auto=format&fit=crop',
            logoUrl: 'https://images.unsplash.com/photo-1517232115160-ff93364542dd?q=80&w=300&auto=format&fit=crop'
          },
          {
            id: 'collection-006',
            name: 'Axie Legends',
            description: 'Digital pets that battle and breed in the Axie Infinity metaverse',
            creator: '0x7Bc5d6Ada37AfB9F0B3e4CAa95401F2F9B27c123',
            creatorName: 'AxieCreator',
            itemCount: 523,
            floorPrice: 3.1,
            totalVolume: 2850.5,
            category: 'gaming',
            verified: true,
            bannerUrl: 'https://images.unsplash.com/photo-1605899435973-ca2d1a8431cf?q=80&w=1000&auto=format&fit=crop',
            logoUrl: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=300&auto=format&fit=crop'
          },
          {
            id: 'collection-007',
            name: 'NBA Moments',
            description: 'Officially licensed NBA memorable plays and moments',
            creator: '0x9Ca5d6Afe37AaA9F0B3e4CAa95401F2F9B27c890',
            creatorName: 'NBAtopshot',
            itemCount: 750,
            floorPrice: 0.5,
            totalVolume: 12500.0,
            category: 'sports',
            verified: true,
            bannerUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop',
            logoUrl: 'https://images.unsplash.com/photo-1508346640046-318010c1fa97?q=80&w=300&auto=format&fit=crop'
          },
          {
            id: 'collection-008',
            name: 'ENS Domains',
            description: 'Ethereum Name Service domains for your wallet and Web3 identity',
            creator: '0x1Fc8A4Dfd37AfB9F0B3e4CbB95401F2F9B27c789',
            creatorName: 'ENSRegistry',
            itemCount: 1500,
            floorPrice: 0.08,
            totalVolume: 45000.0,
            category: 'domains',
            verified: true,
            bannerUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop',
            logoUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=300&auto=format&fit=crop'
          },
          {
            id: 'collection-009',
            name: 'Access Passes',
            description: 'Utility NFTs granting holders access to exclusive content and events',
            creator: '0x3Eb5d6Cde37AaA9F0B3e4CAa95401F2F9B27c456',
            creatorName: 'MembershipDAO',
            itemCount: 500,
            floorPrice: 0.7,
            totalVolume: 2310.0,
            category: 'utility',
            verified: false,
            bannerUrl: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1000&auto=format&fit=crop',
            logoUrl: 'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?q=80&w=300&auto=format&fit=crop'
          }
        ];
        
        setNfts(mockNFTs);
        setCollections(mockCollections);
      } catch (err) {
        setError('Error loading marketplace data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  const handleConnectWallet = () => {
    setConnected(true);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const formatPrice = (price, currency = 'ETH') => {
    return `${price} ${currency}`;
  };
  
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  const filteredNFTs = nfts.filter(nft => {
    // Apply category filter
    const matchesCategory = activeCategory === 'all' || nft.category === activeCategory;
    
    // Apply search filter
    const matchesSearch = 
      nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.creatorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  const filteredCollections = collections.filter(collection => {
    // Apply category filter
    const matchesCategory = activeCategory === 'all' || collection.category === activeCategory;
    
    // Apply search filter
    const matchesSearch = 
      collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.creatorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  const renderExploreTab = () => {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredNFTs.map(nft => (
            <div key={nft.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={nft.imageUrl} 
                  alt={nft.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2 px-2 py-1 bg-gray-800 bg-opacity-75 rounded-lg">
                  <span className="text-xs text-white">{nft.collection}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-1">{nft.name}</h3>
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm text-gray-500">
                    By <span className="text-blue-600">{nft.creatorName}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {nft.tokenStandard} • {nft.tokenId}
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{nft.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs text-gray-500">Current Price</div>
                    <div className="text-lg font-semibold text-gray-900">{formatPrice(nft.price, nft.currency)}</div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredNFTs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No NFTs found matching your criteria.</p>
          </div>
        )}
      </div>
    );
  };
  
  const renderCollectionsTab = () => {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCollections.map(collection => (
            <div key={collection.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-32 w-full relative">
                <img 
                  src={collection.bannerUrl} 
                  alt={`${collection.name} banner`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-10 left-4">
                  <img 
                    src={collection.logoUrl} 
                    alt={`${collection.name} logo`} 
                    className="w-20 h-20 rounded-lg border-4 border-white"
                  />
                </div>
              </div>
              <div className="pt-12 pb-4 px-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{collection.name}</h3>
                  {collection.verified && (
                    <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  By <span className="text-blue-600">{collection.creatorName}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{collection.description}</p>
                <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-200 pt-4">
                  <div>
                    <div className="text-xs text-gray-500">Items</div>
                    <div className="text-sm font-medium">{collection.itemCount}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Floor Price</div>
                    <div className="text-sm font-medium">{formatPrice(collection.floorPrice)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Volume</div>
                    <div className="text-sm font-medium">{formatPrice(collection.totalVolume)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No collections found matching your criteria.</p>
          </div>
        )}
      </div>
    );
  };
  
  const renderMyNFTsTab = () => {
    if (!connected) {
      return (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Wallet not connected</h3>
          <p className="mt-1 text-sm text-gray-500">
            Connect your wallet to view your NFTs
          </p>
          <div className="mt-6">
            <button
              onClick={handleConnectWallet}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      );
    }
    
    // For demo purposes, show a subset of NFTs as "owned"
    const myNFTs = nfts.filter((_, index) => index % 3 === 0);
    
    return (
      <div>
        <h3 className="text-lg font-medium mb-4">Your NFT Collection</h3>
        {myNFTs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No NFTs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              You don't own any NFTs yet. Start by exploring the marketplace.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {myNFTs.map(nft => (
              <div key={nft.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={nft.imageUrl} 
                    alt={nft.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-gray-800 bg-opacity-75 rounded-lg">
                    <span className="text-xs text-white">{nft.collection}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{nft.name}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm text-gray-500">
                      By <span className="text-blue-600">{nft.creatorName}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {nft.tokenStandard} • {nft.tokenId}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      List for Sale
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Transfer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">NFT Marketplace</h2>
        <div className="flex items-center space-x-2">
          {!connected ? (
            <button
              onClick={handleConnectWallet}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700">
              Connected: {truncateAddress('0x8Fc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c620')}
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => handleTabChange('explore')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'explore'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Explore NFTs
          </button>
          <button
            onClick={() => handleTabChange('collections')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'collections'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Collections
          </button>
          <button
            onClick={() => handleTabChange('my-nfts')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'my-nfts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My NFTs
          </button>
        </nav>
      </div>
      
      {(activeTab === 'explore' || activeTab === 'collections') && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'explore' ? 'NFTs' : 'collections'}...`}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={activeCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-3 text-gray-600">Loading NFT marketplace...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <div>
          {activeTab === 'explore' && renderExploreTab()}
          {activeTab === 'collections' && renderCollectionsTab()}
          {activeTab === 'my-nfts' && renderMyNFTsTab()}
        </div>
      )}
    </div>
  );
} 