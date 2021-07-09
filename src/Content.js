import React from 'react';
import {connect} from 'react-redux';
import apples from "./apples";
import Apple from "./Apple";
import _ from 'lodash';
import $ from "jquery";
import {setBasket} from "./data/actions/locations";

class Content extends React.Component {


    state = {
        basket: []
    };

    constructor(props) {
        super(props);
        this.applesDown = this.applesDown.bind(this);
    }


    applesDown() {
        // her bir nesne ayrı zamanda inecek; random süre ayarlaması
        const toplam = apples.length;
        const {basket} = this.props;

        for (let i = 0; i < toplam; i++) {
            let time = ((Math.random() * toplam) / 2) * 1000;

            let apple = $('.apple:eq(' + i + ')');

            apple.animate({
                top: '100%'
            }, time, () => {
                // animasyon tamamlanınca
                console.log(`${i}.elma düştü!`);
                setTimeout(() => {
                    apple.remove();
                    basket.push(i);
                    // Her veri eklendikçe, props'tan sepet verilerini geri çekerek, güncelleme
                    let nw = [...basket];
                    setBasket(nw);

                }, 1000);
            });

        }
    }


    shakeTree() {
        // jquery seçicilerimizle content sınıfı seçme
        const content = $('.content');
        // animate.css kütüphanemizin sınıflarından shake'i, content'e sınıf olarak verme
        content.addClass('animated shake speed infinite');

        // eklediğimiz sınıfları 3 saniye sonra geri alma
        setTimeout(() => {
            content.removeClass('animated shake infinite');
            this.applesDown();
        }, 3000);
    }


    render() {
        return (
            <div>
                <div className="headButton">
                    <button onClick={this.shakeTree.bind(this)}>SHAKE AND BASKET APPLES!</button>
                </div>
                <div className={'content'}>
                    <div className="apples">
                        {_.map(apples, (n, index) => <Apple key={index} style={n}/>)}
                    </div>
                    <img style={{width: 512, height: 512}} src={require('./images/tree.svg')} alt={"Tree"}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    basket: state.basket.basket
});

Content = connect(mapStateToProps)(Content);

export default Content;