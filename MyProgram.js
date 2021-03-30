const fs = require('fs')

const args = process.argv[2]
let fileName = "./" + args;

async function readInputFile() {
	let sampleInput;
	fs.readFile(fileName, 'utf8', (err, data) => {
		if (err) {
			console.error(err)
			return
		}
		sampleInput = (data.split("\n"));
		if (sampleInput.length > 0) {
			let sortedArray = [];
			let nameArray = [];
			let parentStart = sampleInput[0].split(" ");
			parentStart = parentStart[0];
			let parentEnd = sampleInput[sampleInput.length - 1].split(" ");
			parentEnd = parentEnd[0];

			for (let i = 0; i < sampleInput.length; i++) {
				let splitInput = sampleInput[i].split(" ");
				if (nameArray.includes(splitInput[1])) {
				} else {
					nameArray.push(splitInput[1]);
				}
			}

			for (let i = 0; i < nameArray.length; i++) {
				let nameRecords = []
				sampleInput.map(res => {
					let namerecord = res.split(" ");
					if (namerecord[namerecord.length - 2] == nameArray[i]) {
						nameRecords.push(res)
					}
				});
				sortedArray.push(nameRecords)
			}

			for (let j = 0; j < nameArray.length; j++) {
				let currentInput = nameArray[j];
				findRecordResult(currentInput, j);
			}

			function findRecordResult(currentInput, index) {
				let currentSessions = 0;
				let currentTotalTime = 0;
				let currentStartQueue = [];

				for (let i = 0; i < sortedArray[index].length; i++) {
					let splitInput = sortedArray[index][i].split(" ");
					if (splitInput[2] == "Start") {
						currentStartQueue.push(sortedArray[index][i]);
					} else {
						if (currentStartQueue.length !== 0) {
							let outRecord = currentStartQueue.shift();
							if (outRecord != undefined) {
								let splitEle = outRecord.split(" ");
								currentTotalTime += (Number(new Date('1970-01-01T' + splitInput[0] + 'Z')) - Number(new Date('1970-01-01T' + splitEle[0] + 'Z')));
								currentSessions++;
							}
						} else {
							currentTotalTime += (Number(new Date('1970-01-01T' + splitInput[0] + 'Z')) - Number(new Date('1970-01-01T' + parentStart + 'Z')));
							currentSessions++;
						}
					}
				}

				for (let j = 0; j < currentStartQueue.length; j++) {
					let outRecord = currentStartQueue.shift();
					if (outRecord != undefined) {
						let splitEle = outRecord.split(" ");
						currentTotalTime += (Number(new Date('1970-01-01T' + parentEnd + 'Z')) - Number(new Date('1970-01-01T' + splitEle[0] + 'Z')));
						currentSessions++;
					}
				}
				console.log(currentInput, " ", currentSessions, " ", (currentTotalTime / 1000));
			}

		} else {
			console.log("input file is empty");
		}
	})
}

readInputFile();