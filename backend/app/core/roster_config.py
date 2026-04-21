STARTER_SLOTS = {
    "QB": 1,
    "RB": 2,
    "WR": 2,
    "TE": 1,
    "DEF": 1,
    "K": 1,
}

FLEX_SLOTS = 2
FLEX_ELIGIBLE_POSITIONS = {"RB", "WR", "TE"}

BENCH_SLOTS = 6

TOTAL_ROSTER_SIZE = sum(STARTER_SLOTS.values()) + FLEX_SLOTS + BENCH_SLOTS