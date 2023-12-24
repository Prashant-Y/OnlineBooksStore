import Carousel from 'react-bootstrap/Carousel';

export function CustomCarusel({bookData}) {
  console.log(bookData,"BookData")
  return (
      <Carousel.Item>
          <img
          className="d-block w-100 img-fluid"
          src={bookData?.cover_image}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
  );
}

