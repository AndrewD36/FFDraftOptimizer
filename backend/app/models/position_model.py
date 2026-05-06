from enum import Enum

class Position(str, Enum):
    QB = "QB"
    RB = "RB"
    WR = "WR"
    TE = "TE"
    DEF = "DEF"
    K = "K"