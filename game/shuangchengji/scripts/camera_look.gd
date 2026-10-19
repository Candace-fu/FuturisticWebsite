extends Camera3D
## 坐在桌前的视角：单指拖动左右、上下看，双指或滚轮拉近。

@export var yaw_limit := 0.7
@export var pitch_min := -0.6
@export var pitch_max := 0.25
@export var fov_min := 30.0
@export var fov_max := 70.0

var yaw := 0.0
var pitch := 0.0
var touches := {}
var pinch_start := 0.0
var fov_start := 0.0


func _ready() -> void:
	yaw = rotation.y
	pitch = rotation.x


func _unhandled_input(event: InputEvent) -> void:
	if event is InputEventScreenTouch:
		if event.pressed:
			touches[event.index] = event.position
		else:
			touches.erase(event.index)
		if touches.size() == 2:
			var p: Array = touches.values()
			pinch_start = (p[0] as Vector2).distance_to(p[1])
			fov_start = fov
	elif event is InputEventScreenDrag:
		touches[event.index] = event.position
		if touches.size() == 2:
			var p: Array = touches.values()
			var d := (p[0] as Vector2).distance_to(p[1])
			fov = clampf(fov_start * pinch_start / maxf(1.0, d), fov_min, fov_max)
		else:
			yaw = clampf(yaw - event.relative.x * 0.004, -yaw_limit, yaw_limit)
			pitch = clampf(pitch - event.relative.y * 0.003, pitch_min, pitch_max)
			rotation = Vector3(pitch, yaw, 0.0)
	elif event is InputEventMouseButton and event.pressed:
		if event.button_index == MOUSE_BUTTON_WHEEL_UP:
			fov = clampf(fov - 2.0, fov_min, fov_max)
		elif event.button_index == MOUSE_BUTTON_WHEEL_DOWN:
			fov = clampf(fov + 2.0, fov_min, fov_max)
