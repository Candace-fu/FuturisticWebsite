extends Node3D
## 墙上的挂钟，指针跟着工作室时间走。

@onready var hour_hand: Node3D = $HourHand
@onready var minute_hand: Node3D = $MinuteHand


func set_time(hh: int, mm: int) -> void:
	minute_hand.rotation.z = -mm / 60.0 * TAU
	hour_hand.rotation.z = -((hh % 12) + mm / 60.0) / 12.0 * TAU
