import React, {Component} from 'react';
import {Carousel, CarouselItem, CarouselCaption, CarouselIndicators, CarouselControl} from 'reactstrap';

const items = [
  {
      src: require('../../assets/activity_img/2019_03_19_1.jpg'),
      altText: '1학기 개강총회',
      caption: '1학기 개강총회',
  },
  {
      src: require('../../assets/activity_img/2019_04_04_1.jpg'),
      altText: '파이데이 PAI Day',
      caption: '파이데이 PAI Day',
  },
  {
      src: require('../../assets/activity_img/2019_05_12_1.JPG'),
      altText: '봄 엠티MT',
      caption: '봄 엠티MT',
  },
];

class HomePicture extends Component {

    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        const slides2 = items.map((item) => {
        return (
            <CarouselItem
                onExiting={this.onExiting}
                onExited={this.onExited}
                key={item.src}
            >
                <img className="d-block w-100" src={item.src} alt={item.altText}/>
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        );
    });

        return(
            <div>
                <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides2}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
            </div>
        )
    }
}
export default HomePicture