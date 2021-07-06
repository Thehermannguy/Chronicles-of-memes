
/*--------------------------------------------------------------------------
  
  �X�L���u�����v
  �X�L�����L���Ƀ_���[�W�������ɂȂ邪2�`5��U�����s���悤�ɂȂ�
  �J�X�^���p�����[�^�ōU���񐔂ƃ_���[�W���[�g�ύX��

  �g�p���@:
  �X�L���ŃJ�X�^����I�����A�L�[���[�h��[OT_BoisterousDance]��ݒ肵�܂��B
  �J�X�^���p�����[�^��n�����ŃX�L���̏ڍׂ�ݒ�ł��܂��B

  �J�X�^���p�����[�^
  {
      DamageRate     :(���l)	//��%�_���[�W�ɂȂ邩�ݒ�
    , MaxAttackCount :(���l)	//�ő剽��U�����邩
    , MinAttackCount :(���l)	//�Œ�ł�����U�����邩
    , isRateChange   :(���l)	//0�ŃX�L�����������Ă��邾���Ń_���[�W���[�g�ύX�A1�ŃX�L���������̂݃_���[�W���[�g�ύX
    , isNoReattack   :(���l)	//����CalA��noreattack�̉e�����󂯂邩�ݒ�A1�Ŏ󂯂�A0�Ŏ󂯂Ȃ�
  }

  DamageRate�����ݒ�Ȃ�50
  MaxAttackCount�����ݒ�Ȃ�5�ɂȂ�܂��B
  MinAttackCount�����ݒ�Ȃ�2�ɂȂ�܂��B
  isRateChange�����ݒ�Ȃ�0�ɂȂ�܂��B
  isNoReattack�͖��ݒ�Ȃ�1�ɂȂ�܂��B
  
  �쐬��:
  o-to
  
  �X�V����:
  2015/5/31:�V�K�쐬
  2015/9/13:1-239���̓���CalA��noreattack�ɑΉ�
  2015/10/31�F�����̊֐��̖��O�ύX�ɔ����C��

  English Comments by Pikmin1211
  Script Fix by Ragnarok ��

  An astra-like attack. To replicate Astra, use these custom parameters:
  {
	DamageRate:50,
	MinAttackCount:5,
	MaxAttackCount:5
  }

  Damage rate is a percentage of your usual attack power. In this case it will be 50%, or half, damage per hit.
  The keyword is: OT_BoisterousDance

--------------------------------------------------------------------------*/


(function() {

var alias1 = SkillRandomizer.isCustomSkillInvokedInternal;
SkillRandomizer.isCustomSkillInvokedInternal = function(active, passive, skill, keyword) {
	
	// ����
	if (keyword === 'OT_BoisterousDance') {
		// �����^�łȂ��ꍇ�́A�P����true��Ԃ������ł悢
		
		// 1-239����noreattack���ݒ肳��Ă��甭�����Ȃ��悤�ɂ���
		if( skill.custom.isNoReattack == null | skill.custom.isNoReattack == 1 )
		{
			var weapon = active.getItem(0); 
			var wpt = weapon.isWeapon(); 
			if (wpt == true){ 
				if(weapon.custom.noreattack == 1){ 
					return false;
				}
			}
		}

		return this._isSkillInvokedInternal(active, passive, skill);
	}

	return alias1.call(this, active, passive, skill, keyword);
};

// �_���[�W�ݒ�
var alias2 = AttackEvaluator.HitCritical.calculateDamage;
AttackEvaluator.HitCritical.calculateDamage = function(virtualActive, virtualPassive, attackEntry) {
	var active = virtualActive.unitSelf;
	var passive = virtualPassive.unitSelf;
	var damage = alias2.call(this, virtualActive, virtualPassive, attackEntry);
	var skill = SkillControl.getPossessionCustomSkill(active, 'OT_BoisterousDance');
	
	if(skill != null)
	{
		if( virtualActive.tmpBoisterousDanceOn == false )
		{
			return damage;
		}
		
		var damage2;
		var custom = skill.custom;
		var percent = 0.5;
		
		if( custom.DamageRate != null )
		{
			percent = custom.DamageRate / 100;
		}

		damage2 = Math.floor(damage * percent);
		
		//�����������ł̃_���[�W��0�ȊO�������ɂ��_���[�W�������_�ȉ��ɂȂ�ꍇ�A�_���[�W��1�ɂ���
		if( damage != 0 && damage2 == 0 )
		{
			if(damage >= 0)
			{
				damage = 1;
			}
			else
			{
				damage = -1;
			}
		}
		else
		{
			damage = damage2;
		}
	}

	return damage;
};

// �퓬�J�n�O�̏���
var alias5 = NormalAttackOrderBuilder._getAttackCount;
NormalAttackOrderBuilder._getAttackCount = function(virtualActive, virtualPassive) {
	var skill;
	var attackCount = alias5.call(this, virtualActive, virtualPassive);
	
	skill = SkillControl.getPossessionCustomSkill(virtualActive.unitSelf, 'OT_BoisterousDance');
	
	if( skill != null )
	{
		//������tmpBoisterousDanceOn�̏��������s��
		virtualActive.tmpBoisterousDanceOn = false;
		if ( SkillRandomizer.isCustomSkillInvokedInternal(virtualActive.unitSelf, virtualPassive.unitSelf, skill, 'OT_BoisterousDance') ) {
			var custom = skill.custom;
			var min = 2;
			var max = 5;

			if(custom.MinAttackCount != null)
			{
				min = custom.MinAttackCount;
			}
	
			if(custom.MaxAttackCount != null)
			{
				max = custom.MaxAttackCount;
			}
			
			n = min + root.getRandomNumber() % (max - min + 1);

			// �����̃X�L���ɂ���čU���񐔂��{�ɂȂ�
			attackCount *= n;
			
			// attackEntry���Ȃ�����A�����_�Œǉ������͂ł��Ȃ��B
			// ��Œǉ��ł���悤�ɕۑ�����B
			virtualActive.tmpBoisterousDance = skill;
			virtualActive.tmpBoisterousDanceOn = true;
		}
	}
	
	return attackCount;
};

// attackEntry���쐬���ꂽ�i�K�̏���
var alias6 = NormalAttackOrderBuilder._setInitialSkill;
NormalAttackOrderBuilder._setInitialSkill = function(virtualActive, virtualPassive, attackEntry) {
	
	alias6.call(this, virtualActive, virtualPassive, attackEntry);
	
	if (virtualActive.tmpBoisterousDance != null) {
		if (virtualActive.tmpBoisterousDance.isSkillDisplayable()) {
			attackEntry.skillArrayActive.push(virtualActive.tmpBoisterousDance);
		}
		virtualActive.tmpBoisterousDance = null;
	}
};


})();

