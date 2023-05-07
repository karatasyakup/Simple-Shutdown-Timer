const { exec } = require('child_process');

// runs the command for shutdown
function shutdownComputer() {
  const shutdownCommand = process.platform === 'win32' ? 'shutdown /s /t 0' : 'shutdown now';
  exec(shutdownCommand, (error) => {
    if (error) {
      console.error('computer shutdown failed:', error);
    } else {
      console.log('computer is shutting down...');
    }
  });
}

// gets minutes from the user to enter
function getShutdownTimeFromUser() {
  process.stdout.write('enter the shutdown time (as minute): ');
  process.stdin.on('data', (data) => {
    const minutes = parseInt(data.toString(), 10);
    
    if (isNaN(minutes)) {
      console.error('you entered an invalid value. please enter a number.');
    } else {
      const milliseconds = minutes * 60 * 1000;
      console.log (`the computer shutdown is set for ${minutes} minutes.`);

      const remainingMinutesInterval = setInterval(() => {
        const remainingMilliseconds = milliseconds - (Date.now() - startTime);
        const remainingMinutes = Math.ceil(remainingMilliseconds / (60 * 1000));
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`time to shutdown: ${remainingMinutes} minutes left`);
      }, 1000);

      const startTime = Date.now();
      setTimeout(() => {
        clearInterval(remainingMinutesInterval);
        shutdownComputer();
      }, milliseconds);
    }
    
    process.stdin.pause();
  });
}

// starts the app
function startProgram() {
  console.log('welcome.');
  console.log(`date: ${new Date().toLocaleString()}`);
  getShutdownTimeFromUser();
}

startProgram();
