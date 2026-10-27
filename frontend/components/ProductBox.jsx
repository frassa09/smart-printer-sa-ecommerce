export const ProductBox = ({nome =''}) => {
  return (
    <div className="flex flex-col h-75 w-100 border-2 border-gray-400">
      <img className="h-[60%]" src="https://media.istockphoto.com/id/1980276924/vector/no-photo-thumbnail-graphic-element-no-found-or-available-image-in-the-gallery-or-album-flat.jpg?s=612x612&w=0&k=20&c=ZBE3NqfzIeHGDPkyvulUw14SaWfDj2rZtyiKv3toItk="></img>
      <div>
        {nome}
      </div>
    </div>
  );
};
