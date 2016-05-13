# pomodoro-cli

> Command line tool for setting pomodoro timers

## Features

* Get a notification when the timer is done
* Set multiple timers

## Installation

```
npm install -g hjerling/pomodoro-cli
```

## Usage

##### Start a timer

```
pomodoro start [number_of_minutes]
```
If no value is given it defaults to 25 minutes.


##### List running timers

```
pomodoro list
```

##### Stop a timer

```
pomodoro stop <id>
```

The `id` refers to the id of the timer. Get this `id` from the list of timers. 

## Contributing

1. [Fork it!](https://github.com/hjerling/pomodoro-cli/fork)
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Create new [Pull Request](https://github.com/hjerling/pomodoro-cli/pulls).
