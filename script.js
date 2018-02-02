class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
		    minutes: 0,
            seconds: 0,
            miliseconds: 0,
        }
    }

    reset() {
    this.setState({
        minutes: 0,
        seconds: 0,
        miliseconds: 0
        })
    this.running = false;
    clearInterval(this.watch)    
    }

 	format() {
        return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
	}
	
	start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

	step() {
		if (!this.running) return;
		this.calculate();
	}

	calculate() {
        let {
            miliseconds,
            seconds,
            minutes
        } = this.state;
               
        miliseconds += 1;
		if (miliseconds >= 100) {
			seconds += 1;
			miliseconds = 0;
		}
		if (seconds >= 60) {
			minutes += 1;
			seconds = 0;
        }
        this.setState ({
            miliseconds,
            seconds,
            minutes
          });
	}

	stop() {
		this.running = false;
		clearInterval(this.watch);
	}

    
    render(){
        return (
            <div className="watch">
                <div className="controls">
                    <div className="button" onClick = { () => this.start() }><p className="button_p">START</p></div>
                    <div className="button" onClick = { () => this.stop() }><p className="button_p">STOP</p></div>
                    <div className="button" onClick = { () => this.reset()} ><p className="button_p">RESET</p></div>
                </div>
		        <div className={"stopwatch"}>{this.format()}</div>
            </div>
        )
    }
};

const stopwatch = new Stopwatch (
    document.querySelector('.stopwatch')
);

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = "0" + result;
    }
    return result;
};

const app = document.getElementById('app');
ReactDOM.render(<Stopwatch/>, app);
                                                                                                                                                                                                                                                                                                                                                                                