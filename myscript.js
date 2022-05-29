
(function(){
    let reservedSeats = {
        record1: {
            seat: 'b19',
            owner: {
                fname: 'Joe',
                lname: 'Smith'
            }
        },
        record2: {
            seat: 'b20',
            owner: {
                fname: 'Joe',
                lname: 'Smith'
            }
        },
        record3: {
            seat: 'b21',
            owner: {
                fname: 'Joe',
                lname: 'Smith'
            }
        },
        record4: {
            seat: 'b22',
            owner: {
                fname: 'Joe',
                lname: 'Smith'
            }
        }

    };

    const rows = 'abcdefghijklmnopqrst'.split('');
    const seatsInRow = 15;
    let rowCounter = 0;
    let rowNum;

    function makeRows(sectionType, sectionRowSeats, addToNumbers) {
        for (let i = 0 + addToNumbers; i < sectionRowSeats + addToNumbers; i++) {
            document.getElementById(sectionType).innerHTML +=
                `<div class="a" id="${rows[rowNum]}${(i + 1) + (rowCounter * seatsInRow)}">${(i + 1) + (rowCounter * seatsInRow)}</div>`;
        }
    }

    function rowNumbering(sectionType) {
        document.getElementById(sectionType).innerHTML +=
            `<div class="label">${rows[rowNum]}</div>`;
    }

    for (rowNum = 0; rowNum < rows.length; rowNum++) {
        rowNumbering('left');
        makeRows('left', 3, 0);
        makeRows('middle', 9, 3);
        makeRows('right', 3, 12);
        rowNumbering('right');
        rowCounter++;
    }


    const seats = document.querySelectorAll('.a');
    let selectedSeats = [];

    for (const key in reservedSeats) {
        if (reservedSeats.hasOwnProperty(key)) {
            const seatID = reservedSeats[key]['seat'];

            document.getElementById(seatID).setAttribute('class', 'r');
            document.getElementById(seatID).innerText = 'R';
        }
    }

    seats.forEach( seat => {
        seat.addEventListener('click', () => {
            seatSelectionProcess(seat.id);
        });
    });

    function seatSelectionProcess(thisSeat) {

        if (!document.getElementById(thisSeat).classList.contains('r')) {
            const itemIndex = selectedSeats.indexOf(thisSeat);

            if (itemIndex > -1) {
                selectedSeats.splice(itemIndex, 1);
                document.getElementById(thisSeat).className = 'a';
            }
            else {
                selectedSeats.push(thisSeat);
                document.getElementById(thisSeat).className = 's';
            }

            manageConfirmForm();
            console.clear();
            console.log(selectedSeats);
        }
    }

    document.getElementById('reserve').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('resform').style.display = 'block';
    });

    document.getElementById('cancel').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('resform').style.display = 'none';
    });

    function manageConfirmForm() {
        if (selectedSeats.length > 0) {
            document.getElementById('confirmres').style.display = 'block';


            if (selectedSeats.length === 1) {
                document.getElementById('selectedseats').innerHTML = `<p>You have selected seat ${selectedSeats[0].toUpperCase()}</p>`;
            }
            else {
                let seatsString = selectedSeats.toString().toUpperCase();
                seatsString = seatsString.replace(/,/g, ', ');
                seatsString = seatsString.replace(/, (?=[^,]*$)/, ' and ');
                document.getElementById('selectedseats').innerHTML = `<p>You have selected seats ${seatsString}</p>`;
            }

        }
        else {
            document.getElementById('confirmres').style.display = 'none';

            document.getElementById('selectedseats').innerHTML = '<p>You need to select some seats to reserve.<br><a href="#" id="error">Close</a> this dialog box and pick at least one seat</p>';

            document.getElementById('error').addEventListener('click', event => {
                event.preventDefault();
                document.getElementById('resform').style.display = 'none';
            });
        }
    };

    manageConfirmForm();

    document.getElementById('confirmres').addEventListener('submit', event =>{
        event.preventDefault();
        processReservation();

    });

    function processReservation() {
        const hardCodeRecords = Object.keys(reservedSeats).length;
        const firstName = document.getElementById('fname').value;
        const lastName = document.getElementById('lname').value;

        let counter = 1;
        let nextRecord = '';

        selectedSeats.forEach( thisSeat => {

            document.getElementById(thisSeat).setAttribute('class', 'r');
            document.getElementById(thisSeat).innerHTML = 'R';

            nextRecord = `record${hardCodeRecords + counter}`;

            reservedSeats[nextRecord] = {
                seat: thisSeat,
                owner: {
                    fname: firstName,
                    lname: lastName
                }
            };

            counter++;
        });

        document.getElementById('resform').style.display = 'none';
        selectedSeats = [];
        manageConfirmForm();

        console.log(reservedSeats);
    }
})();