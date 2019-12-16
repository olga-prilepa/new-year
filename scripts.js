window.onload = function() {
    gameMemory.renderGrid(4);
};

gameMemory = {
    step: 0,
    cardVariant: [
        'boots',
        'cake',
        'calendar',
        'fireworks',
        'gift',
        'house',
        'mitten',
        'santa',
    ],
    renderGrid: function (dimension) {
        let randArrayCard = this.cardVariant.concat(this.cardVariant).sort(function () {
            return Math.random() - 0.5;
        });
        let cardKey = 0;
        let container = document.getElementById('fieldWrapper');
        container.innerHTML = '';
        for (let i = 0; i < dimension; i++) {
            var row = document.createElement('tr');
            for (let j = 0; j < dimension; j++) {
                var cell = document.createElement('td');
                cell.innerHTML = '<div class="card">' +
                    '<div class="card__face" data-value="' + randArrayCard[cardKey] + '" id="card_' + i + j + '"></div>\n' +
                    '</div>';
                cell.addEventListener('click', () => this.cellClickHandler(i, j));
                row.appendChild(cell);
                cardKey++;
            }
            container.appendChild(row);
        }
    },
    cellClickHandler: function (row, col) {
        let card = document.getElementById('card_' + row + col);
        if (card === null) // Клик мимо карточки
        {
            return false;
        }

        this.step++;
        if (this.step > 2) { // Предыдущий ход не завершен
            return false;
        }
        this.openCard(card);
        if (this.step == 2) {
            this.checkHit();
        }
    },
    openCard: function (card) {
        let cardVal = card.dataset.value;
        card.style.background = 'url(images/' + cardVal + '.png)';
        card.classList.add('opened');
    },
    checkHit: function () {
        setTimeout(() => {
            let openCards = document.getElementsByClassName('opened');

            if (openCards[0].dataset.value === openCards[1].dataset.value) {
                openCards[1].parentNode.remove();
                openCards[0].parentNode.remove();
            } else {
                for (i = openCards.length - 1; i >= 0; i--) {
                    openCards[i].style.background = 'url(images/back2.png)';
                    openCards[i].classList.remove('opened');
                }
            }

            this.checkWin();
            this.step = 0;
        }, 700);
    },
    checkWin: function () {
        let cards = document.getElementsByClassName('card');
        if (!cards.length) {
            this.showVictory();
        }
    },
    showVictory: function () {
            let container = document.getElementById('container');
            let fieldWrapper = document.getElementById('fieldWrapper');
            fieldWrapper.innerHTML = '';

            var winner_block = document.createElement('div');
            winner_block.classList.add('winner_block');
            winner_block.setAttribute('id', 'winner_block');
            winner_block.innerHTML = '' +
                '<div class="message">Победа!</div>' +
                '<img src="images/orig.gif" />';
            var playButton = document.createElement('input');
            playButton.setAttribute('class', 'play');
            playButton.setAttribute('id', 'play');
            playButton.setAttribute('type', 'button');
            playButton.setAttribute('value', 'Играть еще');
            playButton.addEventListener('click',  () => {
                winner_block.remove();
                this.renderGrid(4);
            });
            winner_block.appendChild(playButton);
            container.appendChild(winner_block);
        },
};