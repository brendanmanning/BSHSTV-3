import BetterExpoNotifications from './better-expo-notifications';

export default Notifications = {
    sendScoreUpdate(game) {
        BetterExpoNotifications.notifications().sendToTopic(
            "game_" + game.getKey() + "_score",
            {
                title: game.getTeam(),
                body: "Shanahan: " + game.getShanahanScore() + ", " + game.getOpponent() + ": " + game.getOpponentScore(),
                sound: 'default'
            }
        )
    }
}