extends Node3D
## 工作室的一天：10:00 开门，22:00 收工。时间只随打印和剧情走（和 H5 版一致），
## 这里先用滑条和「让时间走」按钮来预览光影。
## 杭州十月中旬，日落约 17:30，之后是蓝调时刻。

const OPEN := 600   # 10:00，以分钟计
const CLOSE := 1320 # 22:00

# 分钟, 天顶色, 地平线色, 太阳色, 太阳亮度, 太阳高度角(度), 环境光色, 环境光亮度, 台灯, 名称
const KEYS := [
	[600,  Color("8ec5e8"), Color("e2f1f4"), Color("fff4e0"), 2.2, 34.0,  Color("fff6ea"), 0.55, 0.0, "上午"],
	[780,  Color("86bde3"), Color("dceef4"), Color("fff8ec"), 2.3, 44.0,  Color("fffaf2"), 0.6,  0.0, "中午"],
	[930,  Color("93bad6"), Color("f5e2c2"), Color("ffe0ae"), 2.0, 24.0,  Color("fff0dc"), 0.5,  0.0, "下午"],
	[1030, Color("7f8db7"), Color("ffae6e"), Color("ff9550"), 1.8, 4.0,   Color("ffd9b8"), 0.4,  0.2, "夕阳"],
	[1060, Color("34467f"), Color("8d78ae"), Color("ff7a4a"), 0.0, -4.0,  Color("a6a8d8"), 0.3,  0.9, "蓝调时刻"],
	[1085, Color("22336c"), Color("56619c"), Color("ff7a4a"), 0.0, -8.0,  Color("8e98d0"), 0.25, 1.1, "蓝调时刻"],
	[1140, Color("0f1532"), Color("212a55"), Color("ff7a4a"), 0.0, -15.0, Color("5e6894"), 0.16, 1.3, "夜晚"],
	[1320, Color("0c1129"), Color("1b2249"), Color("ff7a4a"), 0.0, -15.0, Color("56608c"), 0.14, 1.3, "夜晚"],
]

## 游戏里 1 秒走多少分钟（只在预览「让时间走」时用）
@export var minutes_per_second := 24.0

@onready var sun: DirectionalLight3D = $Sun
@onready var lamp: OmniLight3D = $Desk/Lamp/Light
@onready var env: Environment = $WorldEnvironment.environment
@onready var sky_mat: ProceduralSkyMaterial = env.sky.sky_material
@onready var slider: HSlider = %TimeSlider
@onready var clock_label: Label = %ClockLabel
@onready var phase_label: Label = %PhaseLabel
@onready var play_button: Button = %PlayButton

var minute := float(OPEN)
var playing := false


func _ready() -> void:
	slider.min_value = OPEN
	slider.max_value = CLOSE
	slider.step = 5
	slider.value = minute
	slider.value_changed.connect(func(v: float) -> void: set_minute(v))
	play_button.pressed.connect(_toggle_play)
	set_minute(minute)


func _process(delta: float) -> void:
	if not playing:
		return
	var m := minf(CLOSE, minute + delta * minutes_per_second)
	slider.set_value_no_signal(m)
	set_minute(m)
	if m >= CLOSE:
		_toggle_play()


func _toggle_play() -> void:
	playing = not playing
	if playing and minute >= CLOSE:
		set_minute(OPEN)
	play_button.text = "❚❚ 停一下" if playing else "▶ 让时间走"


## 把工作室的光设到某个时刻（分钟数，600 = 10:00）
func set_minute(m: float) -> void:
	minute = clampf(m, OPEN, CLOSE)
	var i := 0
	while i < KEYS.size() - 2 and minute > KEYS[i + 1][0]:
		i += 1
	var a: Array = KEYS[i]
	var b: Array = KEYS[i + 1]
	var t := clampf((minute - a[0]) / float(b[0] - a[0]), 0.0, 1.0)

	sky_mat.sky_top_color = (a[1] as Color).lerp(b[1], t)
	sky_mat.sky_horizon_color = (a[2] as Color).lerp(b[2], t)
	sky_mat.ground_horizon_color = sky_mat.sky_horizon_color
	sun.light_color = (a[3] as Color).lerp(b[3], t)
	sun.light_energy = lerpf(a[4], b[4], t)
	sun.visible = sun.light_energy > 0.01
	# 太阳从窗外照进来：一天里从左往右移，高度按关键帧走
	var elev := deg_to_rad(maxf(2.0, lerpf(a[5], b[5], t)))
	var azim := deg_to_rad(-35.0 + (minute - OPEN) / 470.0 * 60.0)
	sun.rotation = Vector3(-elev, PI + azim, 0.0)
	env.ambient_light_color = (a[6] as Color).lerp(b[6], t)
	env.ambient_light_energy = lerpf(a[7], b[7], t)
	lamp.light_energy = lerpf(a[8], b[8], t) * 1.2
	env.glow_intensity = 0.6 + lerpf(a[8], b[8], t) * 0.4

	var hh := int(minute) / 60
	var mm := int(minute) % 60
	clock_label.text = "%02d:%02d" % [hh, mm]
	phase_label.text = "收工" if minute >= CLOSE - 20 else (b[9] if t > 0.5 else a[9])
	$Room/BackWall/Clock.set_time(hh, mm)
