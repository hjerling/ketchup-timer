# ketchup-timer

> Command line tool for setting timers

Ketchup timer is a command line tool that lets you set a timer and puts it in the background to let you keep working in the terminal window. When the time is up it will pop-up a notification to let you know that your time is up.

## Installation

```
npm install -g ketchup-timer
```

## Usage

##### Start a timer

```
ketchup start [options] [number_of_minutes]
```
If no value is given it defaults to 25 minutes.

###### Options:
-n, --name <name> - Give the timer a name


##### List running timers

```
ketchup list
```

##### Stop a timer

```
ketchup stop [options] [id]
```

The `id` refers to the id of the timer. Get this `id` from the list of timers.

###### Options:
-n, --name <name> - Stop the timer with a given name
-a, --all - Stop all running timers

## Contributing

1. [Fork it!](https://github.com/hjerling/ketchup-timer/fork)
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Create new [Pull Request](https://github.com/hjerling/ketchup-timer/pulls).

## Why ketchup timer?

* Ketchup consists mainly of ~~sugar~~ tomatoes.
* [Tomato in Italian](https://translate.google.co.uk/#en/it/tomato) is pomodoro.
* Pomodoro is also a [time management method](https://en.wikipedia.org/wiki/Pomodoro_Technique).
